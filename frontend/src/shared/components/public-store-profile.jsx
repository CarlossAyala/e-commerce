import { CalendarIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import {
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";
import { Formatter } from "@/utils";

export const PublicStoreProfile = ({ store }) => {
  return (
    <section className="-mx-4 lg:m-0">
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

      <div className="space-y-1 border-b px-4 pb-4 lg:rounded-b-md lg:border-x">
        <div className="flex items-center gap-2 pt-14">
          <h3 className="text-xl font-semibold">{store.name}</h3>
          {store.official && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CheckBadgeIcon className="size-5 text-blue-600" />
                </TooltipTrigger>
                <TooltipContent className="border border-gray-200 bg-transparent">
                  <p className="text-sm text-blue-600">Verified</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
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
  );
};

PublicStoreProfile.Skeleton = function PublicStoreProfileSkeleton() {
  return (
    <section className="-mx-4 lg:m-0">
      <div className="relative h-64">
        <Skeleton className="h-full w-full rounded-none" />
        <div className="absolute ml-4 size-32 -translate-y-20 rounded-full border border-gray-200 bg-gray-100" />
      </div>
      <div className="space-y-2 border-b px-4 pb-4 pt-14 lg:rounded-b-md lg:border-x">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </section>
  );
};
