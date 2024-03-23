import './global.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { PrivyProvider } from '@privy-io/react-auth';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { ThemeProvider } from './components/theme-provider';
import { TRPCProvider } from './components/client';
import { Toaster } from './components/ui/toaster';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="frame-scout-theme">
        <PrivyProvider
          appId="clu2zyqd609k7e7y3jwq0zczy"
          config={{
            loginMethods: ['farcaster'],
            // Create embedded wallets for users who don't have a wallet
            embeddedWallets: {
              createOnLogin: 'users-without-wallets',
            },
          }}
        >
          <TRPCProvider>
            <RouterProvider router={router} />
            <Toaster />
          </TRPCProvider>
        </PrivyProvider>
      </ThemeProvider>
    </StrictMode>,
  );
}
