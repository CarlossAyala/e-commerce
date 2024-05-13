import { LogoSeller } from "./logo-seller";
import { SideNav } from "./side-nav";

export const Aside = () => {
  return (
    <aside className="fixed inset-y-0 z-50 hidden w-64 shrink-0 border-r tablet:block">
      <div className="flex h-14 items-center justify-center border-b">
        <LogoSeller />
      </div>
      <div className="mt-4">
        <SideNav />
      </div>
    </aside>
  );
};
