import { Outlet } from "react-router-dom";

export const PrivateRoot = () => {
  return (
    <div className="container min-h-svh overflow-y-auto p-0">
      <aside className="fixed inset-y-0 flex w-64 flex-col border">
        <div className="px-5">Im a sidebar</div>
      </aside>
      <div className="ml-64">
        <Outlet />
      </div>
    </div>
  );
};
