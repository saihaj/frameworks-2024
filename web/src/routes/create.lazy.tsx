import { createLazyFileRoute } from '@tanstack/react-router';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function Dashboard() {
  const [address, setAddress] = React.useState('');
  const { data } = trpc.nft.getBaseNft.useQuery(
    {
      address,
    },
    {
      enabled: !!address,
    },
  );

  const { toast } = useToast();

  return (
    <main className="h-screen w-full mt-4">
      <div className="max-w-2xl mx-auto ">
        <div className="relative hidden flex-col items-start gap-8 md:flex">
          <form className="grid w-full items-start gap-6">
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">Create a frame on Base</legend>

              <div className="grid gap-3">
                <Label htmlFor="contract_address">Contract Address</Label>
                <Input
                  id="contract_address"
                  type="string"
                  placeholder="0x"
                  onChange={e => setAddress(e.target.value)}
                />
              </div>
            </fieldset>
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">Preview</legend>
              {data ? (
                <>
                  <div className="grid gap-3">{data?.imageUrl && <img src={data.imageUrl} />}</div>
                  <Button
                    onClick={async e => {
                      e.preventDefault();
                      const address = `https://frameworks-2024.pages.dev/mint-base/${data.address}`;

                      try {
                        await navigator.clipboard.writeText(address);
                        toast({
                          title: 'Copied to clipboard',
                          description: `Share this link: ${address}`,
                        });
                      } catch (e) {
                        toast({
                          value: 'Failed to copy to clipboard',
                          variant: 'destructive',
                        });
                      }
                    }}
                  >
                    Share a mintable frame
                  </Button>
                  <Button variant="link">
                    <a href={`https://basescan.org/address/${data.address}`} target="_blank">
                      View on Basescan
                    </a>
                  </Button>
                </>
              ) : (
                <h2 className="text-center">Paste an address to start</h2>
              )}
            </fieldset>
          </form>
        </div>
      </div>
    </main>
  );
}

export const Route = createLazyFileRoute('/create')({
  component: Dashboard,
});
