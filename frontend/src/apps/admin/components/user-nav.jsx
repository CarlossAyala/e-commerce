import { useGetProfile } from "@/shared/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components";
import { getFullName, getInitials } from "@/utils";

export const UserNav = () => {
  const { data: admin } = useGetProfile();

  const fullName = getFullName(admin);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/55491792?s=400&u=443015ea5d9d3fe5e957d83a5ff4105ea8c706a2&v=4"
              alt={fullName}
            />
            <AvatarFallback className="font-normal">
              {getInitials(fullName)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="space-y-1 font-normal">
          <p className="truncate text-sm font-medium leading-none">
            {fullName}
          </p>
          <p className="truncate text-xs leading-none text-muted-foreground">
            {admin.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
