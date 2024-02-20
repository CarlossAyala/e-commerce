import { Link } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/signin">Sign in</Link>
        </li>
        <li>
          <Link to="/signup">Sing up</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/customer">Customer</Link>
        </li>
        <li>
          <Link to="/seller">Seller</Link>
        </li>
      </ul>
    </div>
  );
};

export default Root;
