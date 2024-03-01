import { useParams } from "react-router-dom";
import { StoreCard } from "@/apps/customer/components";
import { EmptyPlaceholder } from "@/components";
import { useGetStoresCategory } from "../queries";

export const CategoryStores = () => {
  const { slug } = useParams();
  const {
    data: stores,
    isLoading,
    isError,
    error,
  } = useGetStoresCategory(slug);

  const isEmpty = stores?.length === 0;

  return (
    <section className="space-y-2 px-4 lg:px-0">
      <h3 className="text-base font-medium tracking-tight">Stores</h3>

      {isLoading ? (
        <div className="grid grid-cols-products gap-4">
          <StoreCard.Skeleton />
          <StoreCard.Skeleton />
          <StoreCard.Skeleton />
        </div>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : isEmpty ? (
        <EmptyPlaceholder title="No results" description="No stores found" />
      ) : (
        <div className="grid grid-cols-products gap-4">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}
    </section>
  );
};
