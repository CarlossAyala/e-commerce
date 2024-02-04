import { useParams } from "react-router-dom";
import { EmptyPlaceholder } from "../../../../../components";
import { StoreCard } from "../../../components";
import { useGetStoresCategory } from "../queries";

export const CategoryStores = () => {
  const { slug } = useParams();

  const { stores, isLoading, isError, hasContent, error } =
    useGetStoresCategory(slug);

  return (
    <section className="space-y-2 px-4 lg:px-0">
      <h3 className="text-base font-medium tracking-tight">Stores</h3>

      {isLoading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
          <StoreCard.Skeleton />
          <StoreCard.Skeleton />
          <StoreCard.Skeleton />
        </div>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : !hasContent ? (
        <EmptyPlaceholder title="No results" description="No stores found" />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}
    </section>
  );
};
