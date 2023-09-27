import { withCondition } from "../../routes";
import { useGetProfile } from "../queries";
import { authActionRoutes } from "../utils";

export const WithLoggedIn = ({ component: Component }) => {
  const user = useGetProfile();

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  return withCondition(Component, user.data, authActionRoutes.signin);
};

export const WithLoggedOut = ({ component: Component }) => {
  const user = useGetProfile();

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  return withCondition(Component, !user.data, "/seller");
};
