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
} from "../../../components";
import { navigation } from "../config";
import { useGetProfile, useSignout } from "../../../libs/auth";

const { orders, history, bookmarks, questions, reviews, settings } = navigation;
const navs = [orders, history, bookmarks, questions, reviews];

/**
 * @param {string} fullName
 * @returns {string}
 */
const getInitials = (fullName) => {
  const names = fullName.split(" ");
  const initials = names.map((name) => name[0]);
  if (initials.length > 3) {
    return initials.slice(0, 2).join("").concat("...");
  } else {
    return initials.join("");
  }
};

export const UserNav = () => {
  // const { customer } = useCustomerAuth();
  const { data: customer } = useGetProfile();
  const signout = useSignout();

  const fullName = `${customer?.name} ${customer?.lastName}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={customer.avatar} alt={fullName} />
            <AvatarFallback className="font-normal">
              {getInitials(fullName)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end" forceMount>
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
        <DropdownMenuItem onSelect={() => signout()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
