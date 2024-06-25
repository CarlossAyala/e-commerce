import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import placeholder from "@/assets/images/placeholder-image.jpg";
import { ProductCard } from "@/apps/e-commerce/components";
import { EmptyState, URLPagination } from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Filters,
  Skeleton,
} from "@/components";
import { Formatter } from "@/utils";
import { useGetStore, useGetStoreProducts } from "../queries";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/shared/auth";

const filters = [
  {
    filter_type: "search",
  },
];

export const Store = () => {
  const { storeId } = useParams();
  const [params] = useSearchParams();
  const { data } = useAuth();
  const navigate = useNavigate();

  const store = useGetStore(storeId);
  const products = useGetStoreProducts(storeId, params.toString());

  useDocumentTitle(store.data?.name);

  const handleSendMessage = () => {
    const isAuthenticated = !!data;
    if (isAuthenticated) {
      navigate(`/chats/${storeId}`);
    } else {
      alert("Please sign in to chat");
    }
  };

  return (
    <main className="flex-1 space-y-4 pb-10">
      {store.isLoading ? (
        <section className="desktop:container">
          <div className="relative">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <Skeleton className="aspect-h-9 aspect-w-16 rounded-none sm:aspect-h-4 sm:aspect-w-10 lg:aspect-h-4 lg:aspect-w-14" />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
            <div className="absolute bottom-0 left-4 size-36 translate-y-1/2 overflow-hidden rounded-full border">
              <div className="size-full bg-gray-200"></div>
            </div>
          </div>
          <div className="mt-20 space-y-2 px-4 xl:px-0">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-5 w-full" />
          </div>
        </section>
      ) : store.isError ? (
        <section className="container mt-4">
          <EmptyState
            title="Something went wrong!"
            description="Please try again later"
          />
        </section>
      ) : (
        <section className="desktop:container">
          <Carousel>
            <CarouselContent>
              {store.data.gallery.length ? (
                store.data.gallery.map((image) => (
                  <CarouselItem key={image.id}>
                    <div className="aspect-h-9 aspect-w-16 sm:aspect-h-4 sm:aspect-w-10 lg:aspect-h-4 lg:aspect-w-14">
                      <img
                        src={image.url}
                        alt="Banner"
                        className="size-full object-cover object-center"
                      />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="aspect-h-9 aspect-w-16 sm:aspect-h-4 sm:aspect-w-10 lg:aspect-h-4 lg:aspect-w-14">
                    <img src={placeholder} alt="No banner" />
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
          <div className="relative flex items-start justify-between px-4 pt-2">
            <div className="-mt-16 size-36 overflow-hidden rounded-full border">
              <img
                src={store.data.url ?? placeholder}
                alt="Profile"
                className="size-full object-cover object-center"
              />
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={handleSendMessage}
              >
                <EnvelopeIcon className="size-5" />
              </Button>
            </div>
          </div>
          <div className="mt-2 px-4 xl:px-0">
            <h2 className="text-xl font-semibold md:text-2xl">
              {store.data.name}
            </h2>
            <p>{store.data.description}</p>
            <p className="text-sm text-muted-foreground">
              Created at {Formatter.monthAndYearDate(store.data.createdAt)}
            </p>
          </div>
        </section>
      )}

      <Filters className="container" filters={filters} />

      <section className="container space-y-2">
        <h2 className="font-semibold md:text-xl">Products</h2>

        {products.isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {new Array(2).fill(0).map((_, index) => (
              <ProductCard.Skeleton key={index} />
            ))}
          </div>
        ) : products.isError ? (
          <EmptyState
            title="Something went wrong!"
            description="Please try again later"
          />
        ) : !products.data.rows.length ? (
          <EmptyState
            title="No products found"
            description="Please try again later"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {products.data?.rows.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <URLPagination count={products.data?.count} />
      </section>
    </main>
  );
};
