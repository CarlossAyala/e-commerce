import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
import { useGetProfile, useSignout } from "@/shared/auth";
import { getInitials } from "@/utils";
import { useGetStore } from "../features/store";
import { customerNav, sellerNav } from "../config";
import { CUSTOMER_NAV } from "@/apps/customer";

export const HeaderUserNav = () => {
  const { data: store } = useGetStore();
  const { data: customer } = useGetProfile();
  const signout = useSignout();
  const navigate = useNavigate();

  const handleSignout = () => {
    signout.mutate(null, {
      onSuccess: () => {
        navigate(CUSTOMER_NAV.home.to);
      },
    });
  };

  const fullName = `${customer?.name} ${customer?.lastName}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={null} alt={fullName} />
            <AvatarFallback className="font-normal">
              {getInitials(fullName)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="end" forceMount>
        <DropdownMenuLabel className="space-y-1 font-normal">
          <p className="truncate text-sm font-medium leading-none">
            {fullName}
          </p>
          <p className="truncate text-xs leading-none text-muted-foreground">
            {customer?.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {store ? (
          <DropdownMenuGroup>
            {sellerNav.map((nav, index) => (
              <DropdownMenuItem asChild key={index}>
                <Link to={nav.to}>{nav.name}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup>
            {customerNav.map((nav, index) => (
              <DropdownMenuItem asChild key={index}>
                <Link to={nav.to}>{nav.name}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleSignout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
