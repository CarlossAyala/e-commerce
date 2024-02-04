import { Logo } from "../../../components";
import { UserNav } from "./user-nav";
import { MainNav } from "./main-nav";
import { Sidebar } from "./sidebar";

export const Header = () => {
  return (
    <header className="container flex h-14 items-center">
      <Sidebar />
      <Logo app="customer" className="sm:-ml-2" />
      <MainNav />
      <div className="ml-auto flex items-center space-x-4">
        {/* TODO: Add Cart */}
        <UserNav />
      </div>
    </header>
  );
};
