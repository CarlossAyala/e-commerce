import { useParams } from "react-router-dom";
import clsx from "clsx";
import {
  MainContent,
  ReviewStar,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../components";
import { useGetProduct } from "../queries";
import { useGetReviewStats } from "../../review";
import { Formatter } from "../../../../../utils/formatter";
import { AddToCart, AddToBookmark, StoreInformation } from "../components";
import { useGetStoreByProductId } from "../../store";

const Product = () => {
  const { productId } = useParams();
  const product = useGetProduct(productId);
  const stats = useGetReviewStats(productId);
  const store = useGetStoreByProductId(productId);
  console.log("Review Stats", stats);

  return (
    <MainContent className="space-y-10">
      {product.isLoading && <p>Loading...</p>}
      {product.isSuccess && (
        <>
          <section className="mt-3 space-y-2">
            <div className="flex items-start justify-between gap-x-2">
              <p
                className={clsx(
                  "text-sm font-semibold capitalize leading-none",
                  product.data.condition === "new" && "text-green-700",
                  product.data.condition === "used" && "text-violet-700",
                  product.data.condition === "reconditioned" && "text-blue-700",
                )}
              >
                {product.data.condition}
              </p>
              <div>
                {stats.isLoading ? (
                  <ReviewStar.Skeleton />
                ) : (
                  <>
                    {stats.isError && <ReviewStar.Error />}
                    {stats.isSuccess && (
                      <>
                        <ReviewStar rating={stats.data.average} />
                        <p className="text-sm leading-tight text-muted-foreground">
                          {stats.data.average} ({stats.data.total})
                        </p>
                      </>
                    )}
                  </>
                )}
              </div>
              <p className="text-sm font-medium leading-none text-muted-foreground">
                {product.data.sold} sold
              </p>
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              {product.data.name}
            </h1>
            <div className="w-full sm:h-96">
              <img
                className="h-full w-full object-contain object-center"
                src="https://http2.mlstatic.com/D_NQ_NP_651885-MLA31088151129_062019-O.webp"
                alt={`${product.data.name} image`}
              />
            </div>
            <div className="py-2">
              <p className="text-3xl leading-tight">
                {Formatter.money(product.data.price)}
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium leading-snug">
                Description
              </h3>
              <p className="text-base leading-tight text-muted-foreground">
                {product.data.description}
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium leading-snug">Stock</h3>
              <p className="text-base leading-tight text-muted-foreground">
                {product.data.stock}
              </p>
            </div>
            <div className="space-y-3 pt-4">
              <AddToCart product={product.data} stock={product.data.stock} />
              <AddToBookmark productId={productId} />
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold leading-snug">
              Store Information
            </h2>
            {store.isLoading && <StoreInformation.Skeleton />}
            {store.isError && <StoreInformation.Error error={store.error} />}
            {store.isSuccess && <StoreInformation store={store.data} />}
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold leading-snug">
              Questions and Answers
            </h2>
            <Tabs defaultValue="questions" className="space-y-4">
              <TabsList>
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="Your Questions">Your Questions</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="password">
                Change your password here.
              </TabsContent>
            </Tabs>
          </section>
        </>
      )}
    </MainContent>
  );
};

export default Product;
