import { createLazyFileRoute } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

function Dashboard() {
  const { data, isLoading } = trpc.frames.topGlobal.useQuery({
    limit: 10,
    offset: 0,
  });

  const { toast } = useToast();

  return (
    <main className="flex flex-1 flex-col p-4 max-w-2xl mx-auto">
      <div className="flex flex-col mx-auto space-y-4">
        {isLoading && <div>Loading...</div>}
        {data?.map(frame => (
          <Card>
            <CardHeader />
            <CardContent className="flex flex-col">
              <img
                className="h-full w-full object-cover"
                style={{
                  aspectRatio: 1.91 / 1,
                }}
                src={frame.image}
                alt={frame.image}
              />
              <div className="flex justify-between">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="link" className="text-xs text-muted-foreground m-0 p-0">
                      View on Warpcast
                      <ArrowUpRight size={16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Checkout different casts</AlertDialogTitle>
                      <AlertDialogDescription>
                        <ScrollArea>
                          <div className="h-72">
                            {frame.warpcastUrls.map(url => (
                              <Button key={url} variant="link" className="text-sm m-0 p-0">
                                <a href={url} target="_blank" rel="noreferrer">
                                  {url}
                                </a>
                              </Button>
                            ))}
                          </div>
                        </ScrollArea>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button variant="link" className="text-xs text-muted-foreground m-0 p-0">
                  <a href={frame.url} target="_blank" rel="">
                    {frame.url.match(/https?:\/\/([^/]+)/)?.[1]}
                  </a>
                  <ArrowUpRight size={16} />
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full justify-between">
                {frame.buttons.map(button => {
                  if (button?.action === 'link') {
                    return (
                      <Button variant="default" className="cursor-pointer">
                        <a href={button.target} target="_blank" rel="noreferrer">
                          {button?.text}
                        </a>
                      </Button>
                    );
                  }

                  return (
                    <Button
                      variant="default"
                      className="cursor-pointer"
                      onClick={async () => {
                        toast({
                          variant: 'destructive',
                          title: 'Coming Soon!',
                          description: 'Support for this action is not implemented yet.',
                        });
                      }}
                    >
                      {button?.text}
                    </Button>
                  );
                })}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}

export const Route = createLazyFileRoute('/')({
  component: Dashboard,
});
