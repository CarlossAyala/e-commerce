import { useParams } from "react-router-dom";
import { ProductCard } from "@/apps/e-commerce/components";
import { EmptyState } from "@/shared/components";
import { useGetBestSellerCategory } from "../queries";

export const CategoryBestSeller = () => {
  const { slug } = useParams();
  const { data, isLoading, isError, error } = useGetBestSellerCategory(slug);

  return (
    <section className="space-y-2">
      <h3 className="font-medium tracking-tight">Best Seller</h3>

      {isLoading ? (
        <ProductCard.Skeleton />
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : !data.length ? (
        <EmptyState title="No results" description="No products found" />
      ) : (
        <div className="grid grid-cols-products gap-4">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
