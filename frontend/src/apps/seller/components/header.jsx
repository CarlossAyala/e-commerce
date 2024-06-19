import { Sidebar } from "./sidebar";
import { LogoSeller } from "./logo-seller";
import { UserNav } from "./user-nav";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-4 border-b bg-background px-4 tablet:px-6">
      <div className="flex w-full justify-between tablet:justify-end">
        <Sidebar />
        <LogoSeller className="tablet:hidden" />

        <UserNav />
      </div>
    </header>
  );
};
