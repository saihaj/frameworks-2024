import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { usePrivy } from '@privy-io/react-auth';
import { CircleUser, Menu, Telescope, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTheme } from '@/components/theme-provider';

function Navigation() {
  const { ready, authenticated, login, logout, user } = usePrivy();

  const { setTheme, theme } = useTheme();

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Telescope className="h-6 w-6" />
          <span className="sr-only">FrameScout</span>
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
              <Telescope className="h-6 w-6" />
              <span className="sr-only">FrameScout</span>
            </Link>
            <Button variant="ghost" size="lg" className="bg-blue-600 h-10" asChild>
              <Link to="/create">Open Creator Studio</Link>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial" />

        <Button variant="ghost" size="lg" className="bg-blue-600 hidden md:flex">
          <Link to="/create">Open Creator Studio</Link>
        </Button>

        {!disableLogin ? (
          <Button onClick={login} variant="default" size="lg">
            Login
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {user?.farcaster?.pfp ? (
                  <img src={user.farcaster.pfp} alt="avatar" className="h-8 w-8 rounded-full" />
                ) : (
                  <CircleUser className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user?.farcaster?.username ? (
                <DropdownMenuLabel>{user.farcaster.username}'s Account</DropdownMenuLabel>
              ) : (
                <DropdownMenuLabel>Account</DropdownMenuLabel>
              )}
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Button variant="link" className="w-full">
                  <a
                    href="https://github.com/saihaj/frameworks-2024/issues/new"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="w-full flex justify-start"
                  >
                    Support
                  </a>
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-full h-8 cursor-pointer"
                  onClick={() => {
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                  }}
                >
                  {theme === 'dark' ? (
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  ) : (
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  )}
                  <span className="sr-only">Toggle Theme</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Button
                  onClick={logout}
                  variant="secondary"
                  size="sm"
                  className="w-full cursor-pointer"
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen w-full flex-col">
      <Navigation />
      <hr />
      <Outlet />
    </div>
  ),
});
