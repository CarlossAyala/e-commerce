import { useParams, useSearchParams } from "react-router-dom";
import { ProductCard } from "@/apps/e-commerce/components";
import { EmptyState, URLPagination } from "@/shared/components";
import { useGetStoreProducts } from "../queries";

export const StoreProducts = () => {
  const { storeId } = useParams();
  const [params] = useSearchParams();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetStoreProducts(storeId, params.toString());

  return (
    <>
      {isLoading ? (
        <ProductCard.Skeleton />
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : !products.rows.length ? (
        <EmptyState title="No products" description="No products found." />
      ) : (
        <section className="grid grid-cols-products gap-4">
          {products.rows.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}

      <URLPagination count={products?.count} />
    </>
  );
};
