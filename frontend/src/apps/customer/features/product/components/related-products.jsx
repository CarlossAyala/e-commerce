import { useParams } from "react-router-dom";
import { SliderComponent } from "../../../../../components";
import { useGetRelatedProducts } from "../queries";

export const RelatedProducts = () => {
  const { productId } = useParams();
  const products = useGetRelatedProducts(productId);

  return <SliderComponent type="product" items={products.data} {...products} />;
};
