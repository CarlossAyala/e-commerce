import { Outlet } from "react-router-dom";
import { Header } from "../components";

const RootSeller = () => {
  return (
    <div className="grid h-full min-h-screen w-full grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Header className="col-span-2" />
      <Outlet />
    </div>
  );
};

export default RootSeller;
