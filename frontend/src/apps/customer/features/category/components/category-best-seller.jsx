import { EmptyPlaceholder } from "../../../../../components";
import { ProductCard } from "../../../components";
import { useGetBestSellerCategory } from "../queries";
import { useParams } from "react-router-dom";

export const CategoryBestSeller = () => {
  const { slug } = useParams();
  const { products, hasContent, isLoading, isError, error } =
    useGetBestSellerCategory(slug);

  return (
    <section className="space-y-2 px-4 lg:px-0">
      <h3 className="text-base font-medium tracking-tight">Best Seller</h3>

      {isLoading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
        </div>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : !hasContent ? (
        <EmptyPlaceholder title="No results" description="No products found" />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
