import { useParams } from "react-router-dom";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { EmptyPlaceholder } from "../../../../../components";
import { getResultStatus } from "../../../../../utils";
import { ProductCard, StoreCard } from "../../../components";
import { useGetStoresCategory } from "../queries";

export const CategoryStores = () => {
  const { slug } = useParams();

  const stores = useGetStoresCategory(slug);

  const [hasContent, isEmpty] = getResultStatus(stores);

  return (
    <section className="space-y-2 px-4 lg:px-0">
      <h3 className="text-base font-medium tracking-tight">Stores</h3>
      {stores.isLoading && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
        </div>
      )}

      {stores.isError && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
          <EmptyPlaceholder.Title>Error fetching stores</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            {stores.error.message}
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}

      {isEmpty && (
        <p className="text-sm italic text-muted-foreground">
          No products store.
        </p>
      )}

      {hasContent && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
          {stores.data.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}
    </section>
  );
};
