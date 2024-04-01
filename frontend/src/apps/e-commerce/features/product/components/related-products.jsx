import { useParams } from "react-router-dom";
import { useGetRelatedProducts } from "@/shared/features/product";
import { SliderComponent } from "@/components";

export const RelatedProducts = () => {
  const { productId } = useParams();
  const products = useGetRelatedProducts(productId);

  return (
    <SliderComponent type="product" items={products.data?.rows} {...products} />
  );
};
