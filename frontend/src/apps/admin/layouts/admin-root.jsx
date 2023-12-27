import { Outlet } from "react-router-dom";
import { Sidebar, SidebarMobile, UserNav } from "../components";

const AdminRoot = () => {
  return (
    <div className="container min-h-screen overflow-auto p-0 lg:border-x">
      <aside className="fixed inset-y-0 z-50 hidden w-64 shrink-0 border-r bg-white lg:block">
        <Sidebar />
      </aside>
      <div className="overflow-y-auto lg:pl-64">
        <header className="flex h-14 w-full items-center justify-between border-b px-4 lg:justify-end">
          <SidebarMobile />
          <UserNav />
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRoot;
