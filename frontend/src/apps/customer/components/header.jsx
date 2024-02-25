import { Link } from "react-router-dom";
import { Button, Logo, Skeleton } from "../../../components";
import { UserNav } from "./user-nav";
import { MainNav } from "./main-nav";
import { Sidebar } from "./sidebar";
import { UserCart } from "./user-cart";
import { SearchNav } from "./search-nav/search-nav";
import { useAuth, useGetProfile } from "@/shared/auth";

export const Header = () => {
  const { isAuthenticated } = useAuth();
  const { isLoading } = useGetProfile();

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
            <Skeleton className="size-9 rounded-full" />
            <Skeleton className="h-9 w-10 " />
          </>
        ) : (
          <>
            <UserNav />
            <UserCart />
          </>
        )}
      </div>
    </header>
  );
};
