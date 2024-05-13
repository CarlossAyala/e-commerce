import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useGetProfile, useSignout } from "@/shared/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
} from "@/components";
import { getFullName, getInitials } from "@/utils";
import { Spinner } from "@/shared/components";

export const UserNav = () => {
  const { data: admin, isLoading, isError, error } = useGetProfile();

  const signout = useSignout();

  const handleSignout = (e) => {
    e.preventDefault();
    signout.mutate(null);
  };

  const fullName = getFullName(admin);

  return (
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
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="@ShadCN" />
              <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
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
            <p className="text-sm font-medium leading-none">{fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {admin.email}
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
