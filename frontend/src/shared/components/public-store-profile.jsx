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
    <section>
      <div className="relative h-64">
        <img
          className="h-full w-full rounded-md object-cover shadow-md"
          src="https://http2.mlstatic.com/D_NQ_NP803724-MLA74136348520_012024-B.webp"
        />
        <img
          className="absolute ml-4 size-32 -translate-y-20 rounded-full object-contain"
          src="https://http2.mlstatic.com/D_Q_NP_828918-MLA27343044756_052018-T.webp"
        />
      </div>

      <div className="space-y-0.5">
        <div className="mt-14 flex items-center gap-2">
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
        <p className="text-sm text-muted-foreground">{store.description}</p>
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-4" />
          <p className="text-sm">
            Created at {Formatter.monthAndYearDate(store.createdAt)}
          </p>
        </div>
      </div>
    </section>
  );
};

PublicStoreProfile.Skeleton = function PublicStoreProfileSkeleton() {
  return (
    <section>
      <div className="relative h-64">
        <Skeleton className="h-full w-full" />
        <div className="absolute ml-4 size-32 -translate-y-20 rounded-full border border-gray-200 bg-gray-100" />
      </div>
      <div className="mt-14 space-y-2">
        <Skeleton className="h-5 max-w-sm" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </section>
  );
};
