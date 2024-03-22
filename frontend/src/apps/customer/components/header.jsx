import { Link } from "react-router-dom";
import { useAuth } from "@/shared/auth";
import { Logo } from "@/shared/components";
import { Button, Skeleton } from "@/components";
import { UserNav } from "./user-nav";
import { MainNav } from "./main-nav";
import { Sidebar } from "./sidebar";
import { UserCart } from "./user-cart";
import { Search } from "./search";

export const Header = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Sidebar />
        <Logo />
        <MainNav />
        <div className="ml-auto flex items-center gap-2">
          <Search />

          {isLoading ? (
            <>
              <Skeleton className="size-9" />
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
              <Button size="sm" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
