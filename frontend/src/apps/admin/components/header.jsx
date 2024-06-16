import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useGetProfile, useSignout } from "@/shared/auth";
import { Spinner } from "@/shared/components";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
} from "@/components";
import { getInitials } from "@/utils";
import { Sidebar } from "./sidebar";
import { LogoAdmin } from "./logo-admin";

export const Header = () => {
  const { data, isLoading, isError } = useGetProfile();

  const signout = useSignout();

  const handleLogout = (e) => {
    e.preventDefault();
    signout.mutate(null);
  };

  const initial = getInitials(`${data?.name} ${data?.lastName}`);

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-4 border-b bg-white px-4 tablet:px-6">
      <div className="flex w-full justify-between tablet:justify-end">
        <Sidebar />
        <LogoAdmin className="tablet:hidden" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              {isLoading ? (
                <Skeleton className="size-full" />
              ) : isError ? (
                <ExclamationTriangleIcon className="size-4" />
              ) : (
                <div className="flex size-full items-center justify-center rounded-full">
                  {initial}
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              {isLoading ? (
                <div className="space-y-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ) : isError ? (
                <div>
                  <p className="text-sm text-muted-foreground">Error profile</p>
                </div>
              ) : (
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {data.name} {data.lastName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {data.email}
                  </p>
                </div>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={handleLogout}
              disabled={signout.isLoading}
            >
              {signout.isLoading && <Spinner className="mr-2 size-4" />}
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
