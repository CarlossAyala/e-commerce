import { useParams } from "react-router-dom";
import { ProductsCarousel } from "@/apps/e-commerce/components";
import { useGetRelatedProducts } from "@/shared/features/product";
import { EmptyState } from "@/shared/components";

export const RelatedProducts = () => {
  const { productId } = useParams();
  const products = useGetRelatedProducts(productId);

  return products.isLoading ? (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
      <ProductsCarousel.Skeleton />
      <ProductsCarousel.Skeleton />
    </div>
  ) : products.isError ? (
    <EmptyState
      title="Something went wrong!"
      description="Please try again later"
    />
  ) : !products.data.rows.length ? (
    <EmptyState
      title="No related products"
      description="Please try again later"
    />
  ) : (
    <ProductsCarousel products={products.data.rows} />
  );
};
