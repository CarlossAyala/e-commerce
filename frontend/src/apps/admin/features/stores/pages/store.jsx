import { useParams } from "react-router-dom";
import placeholder from "@/assets/images/placeholder-image.jpg";
import { EmptyState, PageHeader, PageHeaderHeading } from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import { Formatter, getFullName, getInitials } from "@/shared/utils";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Separator,
  Skeleton,
} from "@/shared/components";
import { useGetStore } from "../queries";

export const Store = () => {
  const { storeId } = useParams();
  const { data: store, isLoading, isError, error } = useGetStore(storeId);
  useDocumentTitle(store?.name ?? "Store");

  return (
    <main className="flex-1 space-y-4 px-6 pb-10">
      <PageHeader>
        <PageHeaderHeading>Store</PageHeaderHeading>
      </PageHeader>

      {isLoading ? (
        <>
          <section>
            <div className="relative">
              <Carousel>
                <CarouselContent>
                  <CarouselItem>
                    <Skeleton className="aspect-h-9 aspect-w-16 sm:aspect-h-6 lg:aspect-h-4" />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
              <div className="absolute bottom-0 left-4 size-36 translate-y-1/2 overflow-hidden rounded-full border">
                <div className="size-full bg-gray-200" />
              </div>
            </div>
            <div className="mt-20 space-y-2 px-4 xl:px-0">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-5 w-full" />
            </div>
          </section>

          <Separator />

          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="grow space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </CardContent>
          </Card>
        </>
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : (
        <>
          <section>
            <div className="relative">
              <Carousel>
                <CarouselContent>
                  {store.gallery.length ? (
                    store.gallery.map((image) => (
                      <CarouselItem key={image.id}>
                        <div className="aspect-h-9 aspect-w-16 overflow-hidden rounded-md border sm:aspect-h-6 lg:aspect-h-4">
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
                      <div className="aspect-h-9 aspect-w-16 overflow-hidden rounded-md border sm:aspect-h-6 lg:aspect-h-4">
                        <img src={placeholder} alt="No banner" />
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="absolute bottom-0 left-4 size-36 translate-y-1/2 overflow-hidden rounded-full border">
                <img
                  src={store.url ?? placeholder}
                  alt="Profile"
                  className="size-full object-cover object-center"
                />
              </div>
            </div>
            <div className="mt-16 px-4 pt-2 xl:px-0">
              <h2 className="text-xl font-semibold md:text-2xl">
                {store.name}
              </h2>
              <p>{store.description}</p>
              <p className="text-sm text-muted-foreground">
                Created at {Formatter.monthAndYearDate(store.createdAt)}
              </p>
            </div>
          </section>

          <Card>
            <CardHeader>
              <CardTitle>Store Members</CardTitle>
              <CardDescription>All members in store xd</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="flex size-full items-center justify-center rounded-full">
                    {getInitials(getFullName(store.seller))}
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">
                      {`${store.seller.name} ${store.seller.lastName}`}
                    </p>
                    <p className="text-muted-foreground">
                      {store.seller.email}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="uppercase">
                  Owner
                </Badge>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </main>
  );
};
