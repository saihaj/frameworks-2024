import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { httpBatchLink } from '@trpc/client';
import { trpc } from '../lib/trpc';

const queryClient = new QueryClient();

const client = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/trpc',
    }),
  ],
});

export const TRPCProvider = ({ children }: { children: ReactNode }) => {
  return (
    <trpc.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
