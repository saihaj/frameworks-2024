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

export const onRequest: PagesFunction = async ({ request, params }) => {
  console.log(request);

  if (request.method === 'POST') {
    return new Response(
      JSON.stringify({
        chainId: 'eip155:8453',
        method: 'eth_sendTransaction',
        params: {
          to: 'mintTo',
          // abi: SUPER_MINTER_V2_ABI,
          // data: calldata,
          // value: args.mint.input.value.toString(),
        },
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      },
    );
  }

  const address = params.address;

  if (!address) {
    return new Response('No address provided', { status: 400 });
  }

  const nft = await fetch('https://api.airstack.xyz/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer 1e70e5f2960ae4933b6da871af7e94ae0`,
    },
    body: JSON.stringify({
      query: queryBaseNFT,
      variables: {
        address,
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
    return new Response('No NFT found', { status: 404 });
  }

  const image = nfts.TokenNft?.[0].metaData.image;

  if (!image) {
    return new Response('No NFT Image found', { status: 404 });
  }

  const ipfshash = image.startsWith('ipfs://') ? image.replace('ipfs://', '') : null;

  if (!ipfshash) {
    return new Response('No IPFS Hash found', { status: 404 });
  }

  const imageUrl = `https://ipfs.io/ipfs/${ipfshash}`;

  return new Response(
    `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FrameScout mintable ${address}</title>
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:image" content="${imageUrl}" />
        <meta name="fc:frame:button:1" content="Mint" />
        <meta name="fc:frame:button:1:action" content="tx" />
      </head>
      <body>
        Check on Farcster to mint this
      </body>
    </html>
    `,
    {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    },
  );
};
