import { useGetStoreByProductId } from "../../../store";
import { StoreInformation } from "./store-information";

export const ProductStore = ({ productId }) => {
  const { data: store, isLoading, isError } = useGetStoreByProductId(productId);

  if (isLoading) {
    return <StoreInformation.Skeleton />;
  }

  if (isError) {
    return <StoreInformation.Error />;
  }

  return (
    <div>
      <StoreInformation store={store} />
    </div>
  );
};
