import { Logo } from "@/components";
import { HeaderUserNav } from "./header-user-nav";

export const PublicHeader = () => {
  return (
    <header className="container flex h-14 items-center justify-between">
      <Logo app="seller" />

      <HeaderUserNav />
    </header>
  );
};
