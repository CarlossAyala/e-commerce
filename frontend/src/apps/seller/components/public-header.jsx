import { Logo } from "@/shared/components";
import { HeaderUserNav } from "./header-user-nav";

export const PublicHeader = () => {
  return (
    <header className="container flex h-14 items-center justify-between">
      <Logo />

      <HeaderUserNav />
    </header>
  );
};
