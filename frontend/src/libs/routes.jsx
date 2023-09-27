import { Navigate } from "react-router-dom";

/**
 * A higher-order wrapper for the conditional route component
 * Can be used directly, or used as a building block for more
 * specific components like `withLoggedIn` or `withAdmin`
 *
 * https://www.toptal.com/react/react-router-tutorial
 */
export function withCondition(Component, condition, redirectTo) {
  return condition ? <Component /> : <Navigate to={redirectTo} replace />;
}
