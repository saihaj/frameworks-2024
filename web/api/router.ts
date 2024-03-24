import { initTRPC } from '@trpc/server';
import { z } from 'zod';

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

class MetaCollector {
  public fc: {
    'fc:frame': string;
    'fc:frame:image': string;
    'fc:frame:post_url'?: string;
    'fc:frame:input:text'?: string;
    'fc:frame:image:aspect_ratio'?: string;
    'fc:frame:state'?: string;
  } & PartialRecord<`fc:frame:button:${1 | 2 | 3 | 4}`, string> &
    PartialRecord<`fc:frame:button:${1 | 2 | 3 | 4}:action`, string> &
    PartialRecord<`fc:frame:button:${1 | 2 | 3 | 4}:target`, string> &
    PartialRecord<`fc:frame:button:${1 | 2 | 3 | 4}:post_url`, string>;

  constructor() {
    // @ts-ignore
    this.fc = {};
  }

  element(element: Element): void {
    const property = element.getAttribute('property');
    const content = element.getAttribute('content');
    if (property && content) {
      // @ts-ignore
      this.fc[property] = content;
    }
  }
}

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

const queryBaseNFT = /* GraphQL */ `
  query QueryBaseNFT($address: Address!) {
    TokenNfts(input: { limit: 1, filter: { address: { _eq: $address } }, blockchain: base }) {
      TokenNft {
        address
        blockchain
        chainId
        type
        totalSupply
        metaData {
          image
          externalUrl
        }
      }
    }
  }
`;

const frames = router({
  topGlobal: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(10),
        offset: z.number().min(0).default(0),
      }),
    )
    .query(async ({ input }) => {
      const globabGraphFramesURL = new URL('https://graph.cast.k3l.io/frames/global/rankings');
      globabGraphFramesURL.searchParams.set('agg', 'sumsquare');
      globabGraphFramesURL.searchParams.set('weights', 'L1C10R5');
      globabGraphFramesURL.searchParams.set('details', 'true');
      globabGraphFramesURL.searchParams.set('offset', input.offset.toString());
      globabGraphFramesURL.searchParams.set('limit', input.limit.toString());

      const topFrames = await fetch(globabGraphFramesURL.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-From-App': 'FrameScout',
        },
        cf: {
          cacheTtl: 300,
        },
      });

      const data = await topFrames.json();

      const frames = await Promise.all(
        // @ts-expect-error ignore for now
        data?.result?.map(async frames => {
          const castHash = frames.cast_hashes?.[0];

          const read = await fetch(frames.url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-From-App': 'FrameScout',
            },
            cf: {
              cacheTtl: 60,
            },
          });

          const meta = new MetaCollector();

          await new HTMLRewriter().on('meta[property^="fc:"]', meta).transform(read).text();

          const fcstate = {
            version: meta.fc['fc:frame'],
            image: meta.fc['fc:frame:image'],
            postUrl: meta.fc['fc:frame:post_url'],
            text: meta.fc['fc:frame:input:text'],
            aspectRatio: meta.fc['fc:frame:image:aspect_ratio'],
            state: meta.fc['fc:frame:state'],
            buttons: Object.entries(meta.fc)
              .map(([key, value]) => {
                if (key.match(/^fc:frame:button:[1-4]$/)) {
                  const buttonIndex = key.split(':')[3];
                  return {
                    index: buttonIndex,
                    text: value,
                    // @ts-expect-error ignore for now
                    action: meta.fc[`fc:frame:button:${buttonIndex}:action`],
                    // @ts-expect-error ignore for now
                    target: meta.fc[`fc:frame:button:${buttonIndex}:target`],
                    // @ts-expect-error ignore for now
                    postUrl: meta.fc[`fc:frame:button:${buttonIndex}:post_url`],
                  };
                }
              })
              .filter(Boolean),
          };

          return {
            url: frames.url,
            castHash,
            warpcastUrls: frames.warpcast_urls,
            ...fcstate,
          };
        }),
      );

      return frames;
    }),
});

const nft = router({
  getBaseNft: publicProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const nft = await fetch('https://api.airstack.xyz/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 1e70e5f2960ae4933b6da871af7e94ae0`,
        },
        body: JSON.stringify({
          query: queryBaseNFT,
          variables: {
            address: input.address,
          },
        }),
        cf: {
          cacheTtl: 300,
        },
      });

      const data = await nft.json();

      // @ts-expect-error fix later
      const nfts = data?.data?.TokenNfts;

      if (nfts?.TokenNft.length === 0) {
        return null;
      }

      const image = nfts.TokenNft?.[0].metaData.image;

      if (!image) return null;

      const ipfshash = image.startsWith('ipfs://') ? image.replace('ipfs://', '') : null;
      console.log(ipfshash);
      if (!ipfshash) return null;

      const imageUrl = `https://ipfs.io/ipfs/${ipfshash}`;

      return {
        address: nfts.TokenNft?.[0].address,
        imageUrl,
      };
    }),
});

export const appRouter = router({
  frames,
  nft,
});

export type AppRouter = typeof appRouter;
