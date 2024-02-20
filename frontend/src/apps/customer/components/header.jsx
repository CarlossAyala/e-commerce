import { Button, Logo, Skeleton } from "../../../components";
import { Link } from "react-router-dom";
import { UserNav } from "./user-nav";
import { MainNav } from "./main-nav";
import { Sidebar } from "./sidebar";
import { useAccessToken, useGetProfile } from "../../../libs/auth";
import { UserCart } from "./user-cart";
import { SearchNav } from "./search-nav/search-nav";

export const Header = () => {
  const { data: accessToken } = useAccessToken();
  const { isLoading } = useGetProfile();

  const isAuthenticated = !!accessToken;

  return (
    <header className="container flex h-14 items-center">
      <Sidebar />
      <Logo app="customer" className="sm:-ml-1" />
      <MainNav />
      <div className="ml-auto flex items-center gap-2">
        <SearchNav />

        {!isAuthenticated ? (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </>
        ) : isLoading ? (
          <>
            <UserNav />
            <UserCart />
          </>
        ) : (
          <>
            <Skeleton className="size-9 rounded-full" />
            <Skeleton className="h-9 w-10 " />
          </>
        )}
      </div>
    </header>
  );
};
