import { Outlet } from "react-router-dom";
import { useSocketEventHandler } from "../features/chats";
import { Aside } from "./aside";
import { Header } from "./header";

export const StoreRoot = () => {
  useSocketEventHandler();

  return (
    <div className="relative h-svh bg-background">
      <Aside />
      <div className="flex h-full flex-col tablet:pl-64">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};
