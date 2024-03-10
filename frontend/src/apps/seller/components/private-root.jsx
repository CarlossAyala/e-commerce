import { Link, Outlet } from "react-router-dom";

export const PrivateRoot = () => {
  return (
    <div className="container min-h-svh overflow-y-auto p-0">
      <aside className="fixed inset-y-0 flex w-64 flex-col space-y-4 border p-4">
        <div>
          <p>Store</p>
          <ul className="list-inside list-disc">
            <li>
              <Link to="/seller/create">Create</Link>
            </li>
            <li>
              <Link to="/seller/store">Profile</Link>
            </li>
            <li>
              <Link to="/seller/store/requests-verify">Requests Verify</Link>
            </li>
          </ul>
        </div>
        <div>
          <p>Product</p>
          <ul className="list-inside list-disc">
            <li>
              <Link to="/seller/products">List</Link>
            </li>
            <li>
              <Link to="/seller/products/new">New</Link>
            </li>
            <li>
              <Link to="/seller/products/stock-alert">Stock Alert</Link>
            </li>
            <li>
              <Link to="/seller/products/:productId/details">
                Product :id Details
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p>Questions</p>
          <ul className="list-inside list-disc">
            <li>
              <Link to="/seller/qa">Overview</Link>
            </li>
            <li>
              <Link to="/seller/qa/:productId">:productId</Link>
            </li>
          </ul>
        </div>
        <div>
          <p>Orders</p>
          <ul className="list-inside list-disc">
            <li>
              <Link to="/seller/orders">Overview</Link>
            </li>
            <li>
              <Link to="/seller/orders/:orderId/detail">:orderId</Link>
            </li>
          </ul>
        </div>
        <div>
          <p>Reviews</p>
          <ul className="list-inside list-disc">
            <li>
              <Link to="/seller/reviews">Timeline</Link>
            </li>
            <li>
              <Link to="/seller/reviews/:productId">:productId</Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="ml-64">
        <Outlet />
      </div>
    </div>
  );
};
