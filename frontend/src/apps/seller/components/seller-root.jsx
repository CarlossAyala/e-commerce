import { useGetStore } from "../features/store";
import { StoreRoot } from "./store-root";
import { WithoutStoreRoot } from "./without-store-root";

export const SellerRoot = () => {
  const { data: store } = useGetStore();

  return store ? <StoreRoot /> : <WithoutStoreRoot />;
};
