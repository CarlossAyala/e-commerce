import { useParams } from "react-router-dom";
import { PublicStoreProfile } from "@/shared/components";
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
  EmptyPlaceholder,
  Separator,
  Skeleton,
} from "@/components";
import { getInitials } from "@/utils";
import { useGetStore } from "../queries";

export const Store = () => {
  const { storeId } = useParams();
  const { data: store, isLoading, isError, error } = useGetStore(storeId);

  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">Store</h2>

      {isLoading ? (
        <>
          <PublicStoreProfile.Skeleton />

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
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : (
        <>
          <PublicStoreProfile store={store} />

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
