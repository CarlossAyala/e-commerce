import { Link } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/seller">Seller</Link>
        </li>
        <li>
          <Link to="/customer">Customer</Link>
        </li>
      </ul>
    </div>
  );
};

export default Root;
