import { useSearchParams } from "react-router-dom";
import { ProductCard } from "@/apps/customer/components";
import { useGetProducts } from "@/shared/features/product";
import { useDocumentTitle } from "@/shared/hooks";
import { EmptyPlaceholder, Filters, Pagination } from "@/components";

const filters = [
  {
    filter_type: "search",
  },
];

export const Products = () => {
  useDocumentTitle("Products");
  const [params] = useSearchParams();
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProducts(params.toString());

  const isEmpty = products?.rows.length === 0;

  return (
    <main className="container flex-1 space-y-4">
      <section className="mt-4">
        <h2 className="text-2xl font-semibold uppercase tracking-tight">
          Products
        </h2>
        <p className="text-sm text-muted-foreground">
          This is a list of all the products.
        </p>
      </section>

      <Filters filters={filters} />

      {isLoading ? (
        <section className="grid grid-cols-products gap-4">
          <ProductCard.Skeleton />
        </section>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : isEmpty ? (
        <EmptyPlaceholder title="No products" description="No products found" />
      ) : (
        <section className="grid grid-cols-products gap-4">
          {products.rows.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </section>
      )}

      <Pagination totalRows={products?.count} />
    </main>
  );
};
