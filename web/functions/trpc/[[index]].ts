import { appRouter } from '../../api/router';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

export const onRequest: PagesFunction = async ({ request }) => {
  const response = await fetchRequestHandler({
    endpoint: '/trpc',
    req: request,
    router: appRouter,
    createContext: () => ({}),
  });

  return response;
};
