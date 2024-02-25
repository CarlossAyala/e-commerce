import { Link, useNavigate } from "react-router-dom";
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
} from "../../../components";
import { useGetProfile, useSignout } from "../../../shared/auth";
import { APP_NAVIGATION } from "@/configs";
import { getInitials } from "@/utils";
import { CUSTOMER_NAV } from "../config";

const { orders, history, bookmarks, questions, reviews, settings } =
  CUSTOMER_NAV;
const navs = [orders, history, bookmarks, questions, reviews];

export const UserNav = () => {
  const navigate = useNavigate();
  const { data: customer } = useGetProfile();
  const signout = useSignout();

  const handleSignout = () => {
    signout.mutate(null, {
      onSuccess: () => {
        navigate(APP_NAVIGATION.customer.to);
      },
    });
  };

  const fullName = `${customer?.name} ${customer?.lastName}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={customer?.avatar} alt={fullName} />
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
            {customer.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navs.map((nav, index) => (
            <DropdownMenuItem asChild key={index}>
              <Link to={nav.to}>{nav.name}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to={settings.to}>{settings.name}</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleSignout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
