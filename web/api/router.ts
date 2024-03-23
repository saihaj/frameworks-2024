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

      // const topFrames = await fetch(globabGraphFramesURL.toString(), {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'X-From-App': 'FrameScout',
      //   },
      //   cf: {
      //     cacheTtl: 60,
      //   },
      // });

      const topFrames = {
        results: [
          {
            url: 'https://slice.so/recast-nft',
            score: 0.08105708271191644,
            cast_hashes: [
              '0x56b466d9330359dd12a247f1364081f453729ae5',
              '0x8b7687756f1ca905a5340701520dd28b72850888',
              '0xd3ed7efd7cb6c4df490a8f2e172d33b58b1fe8c5',
              '0xdb5166b7a9ea55ff5915d6ab32a68318e7e72dbb',
            ],
            warpcast_urls: [
              'https://warpcast.com/jacopo.eth/0x56b466d9',
              'https://warpcast.com/df/0xd3ed7efd',
              'https://warpcast.com/elonmuskx/0x8b768775',
              'https://warpcast.com/izzyz/0xdb5166b7',
            ],
          },
          {
            url: 'https://zora.co/collect/zora:0x55f5a5d980992e01256d86e7ef03a22fd5fe84af/1',
            score: 0.078237441467486,
            cast_hashes: [
              '0x01c3f795a3ab39a9969af902d8441b722f3a9ff8',
              '0x0258927d93bfc9b3c4208eaf9be17c24cd212d6c',
              '0x02bd6181129d487627cbe685797b14612e086cc4',
              '0x030c747963543f693a4faf28a621572f765b6263',
              '0x04695c51fc99e4c46af849a97c01065a3de43ddd',
              '0x098d672cd12c4107d598353f0eb5ccb29dcd45ed',
              '0x0a0df9a27195f5260a3a5a663db039158bc7300e',
              '0x0a122cd08d6dc74fb4551f406a94a8fd896c3697',
              '0x0c9f9b0a74df6db4458dfa73a773b41b4a55fa0b',
              '0x1023ec4ef5d5523a2a615e040c118182fde62fd5',
              '0x13aa1351ba242f7ec7eae19067f1f0cac8212bc5',
              '0x146abf6a1c7e152759463aae189070288c4a49cf',
              '0x160ffb1baa4c0dd8eb4c33894e36e9c764d6d098',
              '0x162d4564913f433ee06b65ca4d3c49b29945704d',
              '0x1add02b2ac1e23eb8bb9625320faaa959329b9f8',
              '0x1e28b9d3bde8c79499505b7bed7cbd544ff8220d',
              '0x1ebbb8c608eb252378d5ca6b994b4ee5a2e920d6',
              '0x224349e4183191ea27921da2b3f68890dbe224af',
              '0x252f0a452c91ca97558d0cc786548017146cfd1c',
              '0x26adac4e9ccaf316d0b6dbad77d9c94712091094',
              '0x2738ed6b2963f1b84f872414075bf11acc77cf6c',
              '0x2780e8fedbffc1b1d0fd66edcb240b38886eaf9a',
              '0x2bb1821ee84616d1e523187236771a4e13c425fb',
              '0x2bffbf2b819875509904c000d71118e4e6fe5711',
              '0x2df670302f9b563c6c87c789436783500b3017c0',
              '0x2e9c9a0620b3476967db3eeaca2a8655cda8dff1',
              '0x2ff54877f0c80fd0666e8d029f16e0c580591430',
              '0x30c79157d5691e171539515b9316db875010e629',
              '0x30e536677381ee351eda055b6e1342319ec682f9',
              '0x3637932dba8c097fba75ee2b58599c2499e02ebe',
              '0x393ee62730239e456ab64f3654d2874dc4edb6ba',
              '0x393f8d3d5a07f210ca7e4bfe12e45ecfd2468362',
              '0x3c25fdbad98e3519a062cce524489ea21cdc0789',
              '0x47d2976ee266c80f41467031e1b3163f2e6df84c',
              '0x4b93e5f697b1361cc2927d19f72cafc04ab0f447',
              '0x4cb6f7ac98f42feee08f46ab079a3510d47cac35',
              '0x527f2428e5c30092f225abd49d29d72f8bb122cc',
              '0x57ab262e5bad0e0d39ba8e5913cef43d148b98d8',
              '0x586b6db58644c9c920a56e3a7300c2cff643740c',
              '0x5954cb7d0d0d85e4958910148022102c8c91faea',
              '0x59a45c2755d88cd7c184f565bcab48ee2b221dbf',
              '0x5cd8b625f97d055b265bd67b6dedfba0c3c8f09b',
              '0x606f02d7bc3a5e793a038a970af6313ab13b16b0',
              '0x622c6756d0c424a9c474cd5c88ab9ceae5bfd79b',
              '0x654ed1087e2b680c4a6c56730ea99f1cfb26e811',
              '0x66038dac4b85c97f9c77c5a8847d3f91c7fd0838',
              '0x6a91f9ab846b3124683fd978c905cba5067a0990',
              '0x6b71b9b01bae9c6a6e7e4175adc49f3d87b93f87',
              '0x719a0750b5266ff83344b4e38fb818061bc53f42',
              '0x71c63a86de8cb3ba6e749eceebec30670ea2e3c5',
              '0x7518effcd49e360f3ada442af8c4b4bdc973ad24',
              '0x75fa99fb5ebdace0cfad9a4fbe2706331cf32bdc',
              '0x76843a547c7e589f17d8d64e809b2f44ac450886',
              '0x7f5733f2cf7958e53dedd95b3165d9814024e9dc',
              '0x8beff07f8a84f1fe24930bee34d2f1b0b23a8ee3',
              '0x8c7e1ec5a0f608afcd444b4638b9d01e1ff2dad7',
              '0x8d6d3dc05a06511d9e7f4ee03d9a76c3050a62f9',
              '0x8e301d7c0c2ff57e9438dec535e7b31ad4c5ed04',
              '0x8f2914c34f47e57ab016c38be1321b748bc8fd6f',
              '0x91276658371f4499b526817f2ee8f09040ce49f0',
              '0x92704f65ac381f4f39529cb8a87fa1d60f9737b7',
              '0x95fcb40a80a3e06761a1289f2432def80288d322',
              '0x96ff1274b19a0c87416196a9eee7f9b0ac98df27',
              '0x98b11d905ea522b232c70fdcaf1a0e980a70f751',
              '0x9c40aec6a575d36d9b8a8c14acbd68dd4230633b',
              '0x9edf854363801423ea3fd2384444cc36897570b2',
              '0xa020a6112ee13140eafa783f59f87d1a617f8215',
              '0xa494c262441bec884166b08272b6b79c791271fc',
              '0xa569f9c42018d33d1eac0b411b07ee00a47a7d92',
              '0xa74a51d1256f8f52d4787e0a74f794810f0865ef',
              '0xa8937bbdc4dee6e29c0e3c1ae7db2de1e5d577fd',
              '0xa8bf156b24a5600db25cbed42757e78a2ef2eb21',
              '0xaac9fbc077c6e3726e6a042b1b1b6e272e963508',
              '0xab48952508723982c7cb7633cfa2d62e71a25672',
              '0xada5eff85a0ed4eb09f04eb6ad0c099624fd5e2b',
              '0xb0760bdb77155ace4b5eb6ff50224ffa2fded3ed',
              '0xb19dacd192f14456e35d76102dd0b3d6f491b02b',
              '0xb597ff63f078c7109866f69ff15fda07f552d5f3',
              '0xb5f11626c61ed1afa0165f855ffd90563060d8e8',
              '0xb6a90341dc43cade304bb8a23d1a62fb4447e2ba',
              '0xb8d0e03ed18f7fccab8e7716eb3059bcc8c1d05e',
              '0xc1a17998a998bf193ee12f3b6a4488c3e2ae4105',
              '0xc26930a47309954af3936d4a0a5755165c7819eb',
              '0xc82435d1614f283f9f5c25cc6dc8b85a4588d93b',
              '0xc82e15bd60dab32014eeabba5838c8b5ae5558b1',
              '0xcbc0df5824b57eb609cb121e91a60d56c0bff9f8',
              '0xcdf81c064afc6ea7f698bd90d9dee8918d1f207b',
              '0xd796c6cb65a9cc84d572fd11023b3181a49a5de9',
              '0xd9aa19f7b7b536f3525da8aa363f4dc6ba686c7c',
              '0xda3bff337d768d5ea92e3db67ce87c4285a16076',
              '0xdc094c12abaf943ea38ad9c2aea3eb4f81751a8c',
              '0xe0a421063c9d96c53257b2bcad79c7a3d6a42d35',
              '0xe2a832a0492a751c4cc11ea255211ea1979441e4',
              '0xe3484a46176a0e2af934f1da2edd99ccc865f2fe',
              '0xe5d1faf5754b1b46742107ae15729834c310c929',
              '0xead7ef65e1ccfd4b400ad010853c7480308f16bc',
              '0xeb0b93209e055787ea4966dc446ac7dcda1b27a0',
              '0xedc88fe0a2d3cbe29a3c450c751c5b2a66abe576',
              '0xede4b9ffd6287f6e4611cc5a88ee277d59ca1e73',
              '0xf35a589ba8418179f23bbd01585c4381cc1bdac1',
            ],
            warpcast_urls: [
              'https://warpcast.com/danromero.eth/0x1e28b9d3',
              'https://warpcast.com/zora-feed/0x1023ec4e',
              'https://warpcast.com/swarup16/0xfdb3753f',
              'https://warpcast.com/arsi90/0x76843a54',
              'https://warpcast.com/daohongocquy/0xcdf81c06',
              'https://warpcast.com/wecreateproject.eth/0x527f2428',
              'https://warpcast.com/saba2552/0x8f2914c3',
              'https://warpcast.com/erishuseyin/0x654ed108',
              'https://warpcast.com/maxwyrn/0xe5d1faf5',
              'https://warpcast.com/ahmetkaan26/0x2738ed6b',
              'https://warpcast.com/kh-frhn/0x622c6756',
              'https://warpcast.com/kh-frhn/0x622c6756',
              'https://warpcast.com/woong/0x2df67030',
              'https://warpcast.com/woong/0x2df67030',
              'https://warpcast.com/azadim/0x8beff07f',
              'https://warpcast.com/azadim/0x8beff07f',
              'https://warpcast.com/degen-baby/0x719a0750',
              'https://warpcast.com/zennix/0xc26930a4',
              'https://warpcast.com/caligula/0x606f02d7',
              'https://warpcast.com/branksypop/0x9edf8543',
              'https://warpcast.com/galactic/0x586b6db5',
              'https://warpcast.com/chauhdry/0xb8d0e03e',
              'https://warpcast.com/thuy4968/0x92704f65',
              'https://warpcast.com/anh17/0x6b71b9b0',
              'https://warpcast.com/anh17/0x6b71b9b0',
              'https://warpcast.com/kathyngoc/0x30c79157',
              'https://warpcast.com/kurdstan.eth/0xb6a90341',
              'https://warpcast.com/subhadip/0x2ff54877',
              'https://warpcast.com/subhadip/0x2ff54877',
              'https://warpcast.com/iiccii/0x01c3f795',
              'https://warpcast.com/maverick-1/0x47d2976e',
              'https://warpcast.com/maverick-1/0xf3a1adb5',
              'https://warpcast.com/taniko/0x7518effc',
              'https://warpcast.com/cuongisreal/0x4cb6f7ac',
              'https://warpcast.com/wazeer71/0xead7ef65',
              'https://warpcast.com/0xzohre.eth/0xa8937bbd',
              'https://warpcast.com/cotletcrypto/0xab489525',
              'https://warpcast.com/duckplanet.eth/0xda3bff33',
              'https://warpcast.com/duckplanet.eth/0xda3bff33',
              'https://warpcast.com/alirezatt/0x30e53667',
              'https://warpcast.com/sarhangi/0xd9aa19f7',
              'https://warpcast.com/zhen4y/0x71c63a86',
              'https://warpcast.com/x10to1m/0x66038dac',
              'https://warpcast.com/mr-muqeed/0xf35a589b',
              'https://warpcast.com/mr-muqeed/0xf35a589b',
              'https://warpcast.com/4296640.eth/0x098d672c',
              'https://warpcast.com/siswa/0x5954cb7d',
              'https://warpcast.com/surya19/0xa494c262',
              'https://warpcast.com/erfanxbt/0xdc094c12',
              'https://warpcast.com/dilly-27/0xf9fba34c',
              'https://warpcast.com/nona/0x5cd8b625',
              'https://warpcast.com/naksokey/0x0a122cd0',
              'https://warpcast.com/fard/0xede4b9ff',
              'https://warpcast.com/towffeq/0xedc88fe0',
              'https://warpcast.com/shajidsk/0xb0760bdb',
              'https://warpcast.com/davoodi/0xb5f11626',
              'https://warpcast.com/golyakov/0x146abf6a',
              'https://warpcast.com/demaropz/0x160ffb1b',
              'https://warpcast.com/arman01/0x04695c51',
              'https://warpcast.com/lilit/0x7f5733f2',
              'https://warpcast.com/ape404/0x57ab262e',
              'https://warpcast.com/0xfarshad/0x59a45c27',
              'https://warpcast.com/senadej/0x1add02b2',
              'https://warpcast.com/alifatah/0x8c7e1ec5',
              'https://warpcast.com/aminsoroush/0x91276658',
              'https://warpcast.com/rahasdgn/0xa8bf156b',
              'https://warpcast.com/herosaw/0x2bb1821e',
              'https://warpcast.com/vagus/0x030c7479',
              'https://warpcast.com/zahid0786/0x96ff1274',
              'https://warpcast.com/hoseinkh93.eth/0x162d4564',
              'https://warpcast.com/ashkiani.eth/0xe0a42106',
              'https://warpcast.com/perspolis/0xc82435d1',
              'https://warpcast.com/dwwmitry/0x0c9f9b0a',
              'https://warpcast.com/0xsina/0x95fcb40a',
              'https://warpcast.com/0xsina/0x95fcb40a',
              'https://warpcast.com/asmasyed/0xaac9fbc0',
              'https://warpcast.com/gjjnn/0x2e9c9a06',
              'https://warpcast.com/airakib/0x2bffbf2b',
              'https://warpcast.com/mohmad/0x9c40aec6',
              'https://warpcast.com/mohmad/0x9c40aec6',
              'https://warpcast.com/bym02130/0xfaffceb9',
              'https://warpcast.com/ebi1989/0xe3484a46',
              'https://warpcast.com/liquid/0x0258927d',
              'https://warpcast.com/farcastercoin/0x1ebbb8c6',
              'https://warpcast.com/malikg/0xeb0b9320',
              'https://warpcast.com/hakanquarx/0xd796c6cb',
              'https://warpcast.com/mmdeth/0x252f0a45',
              'https://warpcast.com/ramazan/0x26adac4e',
              'https://warpcast.com/89/0x3637932d',
              'https://warpcast.com/1112222/0xc82e15bd',
              'https://warpcast.com/naderi/0x13aa1351',
              'https://warpcast.com/shinsam/0xe2a832a0',
              'https://warpcast.com/harflem/0x393ee627',
              'https://warpcast.com/arkstar/0x393f8d3d',
              'https://warpcast.com/samogonshikua/0xcbc0df58',
              'https://warpcast.com/privet/0x8e301d7c',
              'https://warpcast.com/mohammad63/0x02bd6181',
              'https://warpcast.com/cryptoera/0xa74a51d1',
              'https://warpcast.com/taho/0x0a0df9a2',
              'https://warpcast.com/sport-line140/0x75fa99fb',
            ],
          },
        ],
      };
      console.log('topFrames', topFrames);
      const data = topFrames;
      // const data = await topFrames.json();

      const frames = await Promise.all(
        data.results.map(async frames => {
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
                    // @ts-expect-error
                    action: meta.fc[`fc:frame:button:${buttonIndex}:action`],
                    // @ts-expect-error
                    target: meta.fc[`fc:frame:button:${buttonIndex}:target`],
                    // @ts-expect-error
                    postUrl: meta.fc[`fc:frame:button:${buttonIndex}:post_url`],
                  };
                }
              })
              .filter(Boolean),
          };

          return {
            url: frames.url,
            castHash,
            ...fcstate,
          };
        }),
      );

      return frames;
    }),
});

export const appRouter = router({
  frames,
});

export type AppRouter = typeof appRouter;
