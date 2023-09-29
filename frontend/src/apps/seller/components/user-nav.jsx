import { Link } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components";
import { authActionRoutes, useGetProfile } from "../../../libs/auth";

const UserNav = () => {
  const user = useGetProfile();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        {user.isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <>
            {user.isError && (
              <p className="text-sm text-muted-foreground">
                Error loading account
              </p>
            )}
            {user.isSuccess && (
              <Avatar>
                <AvatarImage src={null} alt="@user" />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
            )}
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8} align="end" className="w-56">
        <div className="p-2">
          {user.isLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <>
              {user.isError && <p>Error loading account</p>}
              {user.isSuccess && (
                <>
                  <p className="line-clamp-1 font-medium">
                    {user.data.name} {user.data.lastName}
                  </p>
                  <p className="line-clamp-1 text-sm text-muted-foreground">
                    {user.data.email}
                  </p>
                </>
              )}
            </>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/account">Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/seller/store">Store</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link to={authActionRoutes.signout}>Sign out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
