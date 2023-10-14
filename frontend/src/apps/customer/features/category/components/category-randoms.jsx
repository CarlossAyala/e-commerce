import { useParams } from "react-router-dom";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { EmptyPlaceholder } from "../../../../../components";
import { getResultStatus } from "../../../../../utils";
import { ProductItem } from "../../../components";
import { useGetRandomsCategory } from "../queries";

export const CategoryRandoms = () => {
  const { slug } = useParams();

  const randoms = useGetRandomsCategory(slug);

  const [hasContent, isEmpty] = getResultStatus(randoms);

  return (
    <section className="space-y-2 px-4 lg:px-0">
      <h3 className="text-base font-medium tracking-tight">Randoms</h3>
      {randoms.isLoading && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
          <ProductItem.Skeleton />
          <ProductItem.Skeleton />
          <ProductItem.Skeleton />
          <ProductItem.Skeleton />
        </div>
      )}

      {randoms.isError && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
          <EmptyPlaceholder.Title>
            Error fetching randoms products.
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            {randoms.error.message}
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}

      {isEmpty && (
        <p className="text-sm italic text-muted-foreground">
          No products found.
        </p>
      )}

      {hasContent && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
          {randoms.data.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
