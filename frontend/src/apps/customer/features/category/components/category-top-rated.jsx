import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { EmptyPlaceholder } from "../../../../../components";
import { getResultStatus } from "../../../../../utils";
import { ProductCard } from "../../../components";
import { useGetTopRatedCategory } from "../queries";
import { useParams } from "react-router-dom";

export const CategoryRopRated = () => {
  const { slug } = useParams();

  const topRated = useGetTopRatedCategory(slug);

  const [hasContent, isEmpty] = getResultStatus(topRated);

  return (
    <section className="space-y-2 px-4 lg:px-0">
      <h3 className="text-base font-medium tracking-tight">Top Rated</h3>
      {topRated.isLoading && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
        </div>
      )}

      {topRated.isError && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
          <EmptyPlaceholder.Title>
            Error fetching top rated products
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            {topRated.error.message}
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
          {topRated.data.map((rate) => (
            <ProductCard key={rate.product.id} product={rate.product} />
          ))}
        </div>
      )}
    </section>
  );
};
