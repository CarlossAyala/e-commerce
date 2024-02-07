import { Button, Logo, Skeleton } from "../../../components";
import { Link } from "react-router-dom";
import { UserNav } from "./user-nav";
import { MainNav } from "./main-nav";
import { Sidebar } from "./sidebar";
import { useCustomerAuth } from "../../../libs/auth";
import { UserCart } from "./user-cart";

export const Header = () => {
  const { isAuthenticated, isLoading } = useCustomerAuth();

  return (
    <header className="container flex h-14 items-center">
      <Sidebar />
      <Logo app="customer" className="sm:-ml-1" />
      <MainNav />
      <div className="ml-auto flex items-center gap-2">
        {isLoading ? (
          <>
            <Skeleton className="h-9 w-10 " />
            <Skeleton className="size-9 rounded-full" />
          </>
        ) : isAuthenticated ? (
          <>
            <UserCart />
            <UserNav />
          </>
        ) : (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
