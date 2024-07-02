import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth";
import { Logo } from "@/shared/components";
import { Skeleton, buttonVariants } from "@/shared/components";
import { UserNav } from "./user-nav";
import { MainNav } from "./main-nav";
import { Sidebar } from "./sidebar";
import { Search } from "./search";
import { UserCart } from "./user-cart";

export const Header = () => {
  const { data, isLoading } = useAuth();
  const isAuthenticated = !!data;

  return (
    <header className="sticky top-0 z-50 shrink-0 border-b bg-background">
      <div className="container flex h-14 items-center">
        <Sidebar />
        <Logo />
        <MainNav />
        <div className="ml-auto flex items-center gap-2">
          <Search />

          {isLoading ? (
            <>
              <Skeleton className="size-8" />
              <UserNav />
            </>
          ) : isAuthenticated ? (
            <>
              <UserCart />
              <UserNav />
            </>
          ) : (
            <>
              <Link
                className={buttonVariants({ variant: "ghost", size: "sm" })}
                to="/signin"
              >
                Sign In
              </Link>
              <Link className={buttonVariants({ size: "sm" })} to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
