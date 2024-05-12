import { useSearchParams } from "react-router-dom";
import { ProductCard } from "@/apps/e-commerce/components";
import { useGetProducts } from "@/shared/features/product";
import { useDocumentTitle } from "@/shared/hooks";
import {
  EmptyState,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  URLPagination,
} from "@/shared/components";
import { Filters } from "@/components";

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
    <main className="container flex-1 space-y-4 pb-10">
      <PageHeader>
        <PageHeaderHeading>Products</PageHeaderHeading>
        <PageHeaderDescription>
          This is a list of all the products.
        </PageHeaderDescription>
      </PageHeader>

      <Filters filters={filters} />

      {isLoading ? (
        <ProductCard.Skeleton />
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : isEmpty ? (
        <EmptyState title="No products" description="No products found" />
      ) : (
        <section className="grid grid-cols-products gap-4">
          {products.rows.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}

      <URLPagination count={products?.count} />
    </main>
  );
};