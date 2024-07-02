import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useSocket } from "@/features/socket";
import { useGetProfile, useSignout } from "@/features/auth";
import { Spinner } from "@/shared/components";
import { cn, getInitials } from "@/shared/utils";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
} from "@/shared/components";

export const UserNav = () => {
  const { data: customer, isLoading, isError, error } = useGetProfile();
  const signout = useSignout();
  const { socket } = useSocket();

  const handleSignout = (e) => {
    e.preventDefault();
    signout.mutate(null);
  };

  const initials = getInitials(`${customer?.name} ${customer?.lastName}`);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full">
          {isLoading ? (
            <Skeleton className="size-full rounded-full" />
          ) : isError ? (
            <ExclamationTriangleIcon className="size-4" />
          ) : (
            <div className="flex size-full items-center justify-center rounded-full">
              {initials}
            </div>
          )}
          <div
            className={cn(
              "absolute bottom-0 right-0 h-2 w-2 -translate-x-1/3 rounded-full",
              socket.connected && "bg-green-600",
              socket.disconnected && "bg-orange-600",
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {isLoading ? (
          <div className="space-y-1 p-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        ) : isError ? (
          <DropdownMenuLabel className="font-normal">
            <p className="line-clamp-2 text-center text-sm text-muted-foreground">
              {error.message}
            </p>
          </DropdownMenuLabel>
        ) : (
          <DropdownMenuLabel className="space-y-1 font-normal">
            <p className="text-sm font-medium leading-none">
              {customer.name} {customer.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {customer.email}
            </p>
          </DropdownMenuLabel>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleSignout} disabled={signout.isLoading}>
          {signout.isLoading && <Spinner className="mr-2 size-4" />}
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
