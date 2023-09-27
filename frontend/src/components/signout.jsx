import { Navigate } from "react-router-dom";
import { authActionRoutes, useSignout } from "../libs/auth";

const Signout = () => {
  useSignout();

  return <Navigate to={authActionRoutes.signin} />;
};

export default Signout;
