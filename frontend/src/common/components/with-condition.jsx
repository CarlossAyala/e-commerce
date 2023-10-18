import { Navigate } from "react-router-dom";

export const WithCondition = ({
  condition,
  component: Component,
  redirectTo,
}) => {
  return condition ? <Component /> : <Navigate to={redirectTo} replace />;
};
