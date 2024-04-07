import { Link, Outlet } from "react-router-dom";

export const AdminRoot = () => {
  return (
    <div className="container flex min-h-svh flex-col overflow-y-auto p-0">
      <aside className="fixed inset-y-0 flex w-64 flex-col space-y-4 border p-4">
        <div>
          <p>Dashboard</p>
          <ul className="list-inside list-disc">
            <li>
              <Link to="/admin">Dashboard</Link>
            </li>
          </ul>
        </div>
        <div>
          <p>Categories</p>
          <ul className="list-inside list-disc">
            <li>
              <Link to="/admin/categories">Overview</Link>
            </li>
            <li>
              <Link to="/admin/categories/create">New</Link>
            </li>
            <li>
              <Link to="/admin/categories/attach">Attach</Link>
            </li>
            <li>
              <Link to="/admin/categories/detach">Detach</Link>
            </li>
            <li>
              <Link to="/admin/categories/:categoryId/details">
                :categoryId/details
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p>Stores</p>
          <ul className="list-inside list-disc">
            <li>
              <Link to="/admin/stores">Stores</Link>
            </li>
            <li>
              <Link to="/admin/stores/:storeId">:storeID</Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="flex-1 pl-64">
        <Outlet />
      </div>
    </div>
  );
};
