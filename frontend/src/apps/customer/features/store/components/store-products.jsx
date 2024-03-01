import { useParams, useSearchParams } from "react-router-dom";
import { ProductCard } from "@/apps/customer/components";
import { Button, EmptyPlaceholder, Pagination } from "@/components";
import { useGetStoreProducts } from "../queries";

export const StoreProducts = () => {
  const { slug } = useParams();
  const [params, setParams] = useSearchParams();

  const {
    data: products,
    isLoading,
    isError,
    hasContent,
    hasFilters,
    error,
  } = useGetStoreProducts(slug, params.toString());

  return (
    <>
      {isLoading ? (
        <section className="grid grid-cols-products gap-4 px-4 lg:px-0">
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
        </section>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : !hasContent ? (
        <EmptyPlaceholder title="No products" description="No products found.">
          {hasFilters && (
            <Button className="mt-4" onClick={() => setParams()} size="sm">
              Clear filters
            </Button>
          )}
        </EmptyPlaceholder>
      ) : (
        <section className="grid grid-cols-products gap-4 px-4 lg:px-0">
          {products.rows.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}

      <Pagination className="px-4 lg:px-0" totalRows={products?.count} />
    </>
  );
};
