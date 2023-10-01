import { useParams } from "react-router-dom";
import { MainContent } from "../../../../../components";
import { useGetProduct } from "../queries";
import { QuestionsAnswers } from "../components";
import { Review } from "../components/review/review";
import { RelatedProducts } from "../components/related-products";
import { ProductDetail } from "../components/product/product-detail";
import { useEffect } from "react";
import { useAddHistory } from "../../history";

const Product = () => {
  const { productId } = useParams();
  const product = useGetProduct(productId);
  const history = useAddHistory();

  useEffect(
    function addToHistory() {
      history.mutate(productId);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productId],
  );

  return (
    <MainContent className="space-y-10">
      {product.isLoading && (
        <p className="text-base leading-tight text-muted-foreground">
          Loading...
        </p>
      )}
      {product.isError && (
        <p className="text-base leading-tight text-muted-foreground">
          Error loading product
        </p>
      )}
      {product.isSuccess && (
        <>
          <ProductDetail product={product.data} />

          <section className="space-y-2">
            <h2 className="text-lg font-semibold leading-snug">
              Questions and Answers
            </h2>
            <QuestionsAnswers productId={productId} />
          </section>

          <section>
            <h2 className="text-lg font-semibold leading-snug">Reviews</h2>
            <Review productId={productId} />
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold leading-snug">
              Related products
            </h2>
            <RelatedProducts productId={productId} />
          </section>
        </>
      )}
    </MainContent>
  );
};

export default Product;
