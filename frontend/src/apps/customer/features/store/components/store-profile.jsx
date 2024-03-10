import { useParams } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useDocumentTitle } from "@/shared/hooks";
import {
  EmptyPlaceholder,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Skeleton,
} from "@/components";
import { Formatter } from "@/utils";
import { useGetStore } from "../queries";
import { PublicStoreProfile } from "@/shared/components";

export const StoreProfile = () => {
  useDocumentTitle(store?.name ?? "Store");
  const { slug } = useParams();
  const { data: store, isLoading, isError, error } = useGetStore(slug);

  return (
    <section className="border-b lg:rounded-b-md lg:border-x">
      {isLoading ? (
        <PublicStoreProfile.Skeleton />
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : (
        <>
          <PublicStoreProfile store={store} />
          <div className="mt-14 space-y-2 px-4 pb-4 pt-3">
            <div className="flex items-center gap-1">
              <h2 className="text-xl font-bold">{store.name}</h2>
              {store.official && (
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer">
                    <CheckBadgeIcon className="h-5 w-5 text-sky-600" />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-auto space-y-1 p-2">
                    <CheckBadgeIcon className="mx-auto size-14 text-sky-600" />
                    <p className="text-sm font-medium">Verified Store</p>
                  </HoverCardContent>
                </HoverCard>
              )}
            </div>
            <p className="mt-2 text-sm leading-tight">{store.description}</p>
            <div>
              <ul>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDaysIcon className="h-4 w-4" />
                  <span>
                    Joined {Formatter.monthAndYearDate(store.createdAt)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

StoreProfile.Skeleton = function StoreProfileSkeleton() {
  return (
    <>
      <Skeleton className="h-56 rounded-none" />
      <div className="relative">
        <div className="absolute ml-4 h-32 w-32 -translate-y-1/2 rounded-full bg-neutral-100" />
      </div>
      <div className="mt-16 space-y-2 px-4 pb-4 pt-2">
        <Skeleton className="h-6 w-1/3" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-4 w-1/3" />
      </div>
    </>
  );
};
