import { useGetStore } from "../features/store";
import { PrivateRoot } from "./private-root";
import { PublicRoot } from "./public-root";

export const SellerRoot = () => {
  const { data: store } = useGetStore();

  return store ? <PrivateRoot /> : <PublicRoot />;
};
