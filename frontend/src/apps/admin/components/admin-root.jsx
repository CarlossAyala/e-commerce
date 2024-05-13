import { Outlet } from "react-router-dom";
import { Aside } from "./aside";
import { Header } from "./header";

export const AdminRoot = () => {
  return (
    <div className="h-svh">
      <Aside />
      <div className="flex h-full flex-col tablet:pl-64">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};
