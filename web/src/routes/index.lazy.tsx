import { createLazyFileRoute } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';

function Dashboard() {
  const { data } = trpc.frames.topGlobal.useQuery({
    limit: 10,
    offset: 0,
  });
  console.log(data);
  return (
    <main className="flex flex-1 flex-col p-4 max-w-2xl mx-auto">
      <div className="flex flex-col mx-auto space-y-4">
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
              <div className="flex justify-end">
                <Button variant="link" className="text-xs text-muted-foreground m-0 p-0">
                  <a href={frame.url} target="_blank" rel="">
                    {frame.url.match(/https?:\/\/([^/]+)/)?.[1]}
                  </a>
                  <ArrowUpRight size={16} />
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex">
                {frame.buttons.map(button => (
                  <Button variant="default" className="cursor-pointer">
                    {button?.text}
                  </Button>
                ))}
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
