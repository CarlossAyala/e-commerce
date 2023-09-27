import { withCondition } from "../../libs/routes";
import { storeActionRoutes, useGetStore } from "./store";

export const WithStore = ({ component: Component }) => {
  const store = useGetStore();

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  return withCondition(Component, store.data, storeActionRoutes.new);
};

export const WithoutStore = ({ component: Component }) => {
  const store = useGetStore();

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  return withCondition(Component, !store.data, storeActionRoutes.root);
};
