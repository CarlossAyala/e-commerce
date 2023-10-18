import { Navigate } from "react-router-dom";
import { authActionRoutes, useGetAdminProfile } from "../../../libs/auth";
import { hasAdminRoles } from "../utils";
import { WithCondition } from "../../../common";

export const WithAdminAuth = ({ component: Component }) => {
  const { data: user, isLoading, isError } = useGetAdminProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <Navigate to={authActionRoutes.signin} replace />;
  }

  const isAdmin = hasAdminRoles(user?.roles);

  return (
    <WithCondition
      condition={isAdmin}
      component={Component}
      redirectTo={authActionRoutes.signin}
    />
  );
};
