import { useParams } from "react-router-dom";
import { StoreCard } from "@/apps/customer/components";
import { EmptyState } from "@/shared/components";
import { useGetStoresCategory } from "../queries";

export const CategoryStores = () => {
  const { slug } = useParams();
  const {
    data: stores,
    isLoading,
    isError,
    error,
  } = useGetStoresCategory(slug);

  return (
    <section className="space-y-2">
      <h3 className="font-medium tracking-tight">Stores</h3>

      {isLoading ? (
        <div className="grid grid-cols-stores gap-4">
          <StoreCard.Skeleton />
          <StoreCard.Skeleton />
          <StoreCard.Skeleton />
        </div>
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : !stores.length ? (
        <EmptyState title="No results" description="No stores found" />
      ) : (
        <div className="grid grid-cols-stores gap-4">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}
    </section>
  );
};
