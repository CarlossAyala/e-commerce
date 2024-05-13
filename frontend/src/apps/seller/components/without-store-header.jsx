import { LogoSeller } from "./logo-seller";
import { UserNav } from "./user-nav";

export const WithoutStoreHeader = () => {
  return (
    <header className="container flex h-14 items-center justify-between">
      <LogoSeller />

      <UserNav />
    </header>
  );
};
