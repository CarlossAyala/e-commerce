import { useParams } from "react-router-dom";
import { ProductCard } from "@/apps/e-commerce/components";
import { EmptyState } from "@/shared/components";
import { useGetCategoryRandomProducts } from "../queries";

export const CategoryRandom = () => {
  const { slug } = useParams();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetCategoryRandomProducts(slug);

  return (
    <section className="space-y-2">
      <h3 className="font-medium tracking-tight">Random</h3>

      {isLoading ? (
        <ProductCard.Skeleton />
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : !products.length ? (
        <EmptyState title="No results" description="No products found" />
      ) : (
        <div className="grid grid-cols-products gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
