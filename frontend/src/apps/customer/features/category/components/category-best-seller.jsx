import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { EmptyPlaceholder } from "../../../../../components";
import { getResultStatus } from "../../../../../utils";
import { ProductCard } from "../../../components";
import { useGetBestSellerCategory } from "../queries";
import { useParams } from "react-router-dom";

export const CategoryBestSeller = () => {
  const { slug } = useParams();

  const bestSellers = useGetBestSellerCategory(slug);

  const [hasContent, isEmpty] = getResultStatus(bestSellers);

  return (
    <section className="space-y-2 px-4 lg:px-0">
      <h3 className="text-base font-medium tracking-tight">Best Seller</h3>
      {bestSellers.isLoading && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
        </div>
      )}

      {bestSellers.isError && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
          <EmptyPlaceholder.Title>
            Error fetching best sellers
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            {bestSellers.error.message}
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
          {bestSellers.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
