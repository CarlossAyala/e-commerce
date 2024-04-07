import { useParams } from "react-router-dom";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { EmptyState, PageHeader, PageHeaderHeading } from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Skeleton,
} from "@/components";
import { Formatter, getInitials } from "@/utils";
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
          <section className="overflow-hidden rounded-md border">
            <div className="relative h-64">
              <Skeleton className="h-full w-full rounded-none" />
              <div className="absolute ml-4 size-32 -translate-y-20 rounded-full border border-gray-200 bg-gray-100" />
            </div>
            <div className="mt-10 space-y-2 p-4">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/2" />
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
          <section className="overflow-hidden rounded-md border">
            <div className="relative h-64">
              <img
                className="h-full w-full object-cover"
                src="https://http2.mlstatic.com/D_NQ_NP803724-MLA74136348520_012024-B.webp"
              />
              <img
                className="absolute ml-4 size-32 -translate-y-20 rounded-full border object-contain"
                src="https://http2.mlstatic.com/D_Q_NP_828918-MLA27343044756_052018-T.webp"
              />
            </div>

            <div className="mt-9 p-4">
              <div>
                <h3 className="text-xl font-semibold">{store.name}</h3>
              </div>
              <p className="text-sm">{store.description}</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarIcon className="size-4" />
                <p className="text-sm leading-none">
                  Created at {Formatter.monthAndYearDate(store.createdAt)}
                </p>
              </div>
            </div>
          </section>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle>Store Members</CardTitle>
              <CardDescription>All members in store xd</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={null} />
                    <AvatarFallback>
                      {getInitials(
                        `${store.seller.name} ${store.seller.lastName}`,
                      )}
                    </AvatarFallback>
                  </Avatar>
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
