import { CalendarDaysIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Formatter } from "../../../../../utils";
import { Skeleton } from "../../../../../components";

export const StoreDetails = ({ store }) => {
  return (
    <div className="overflow-hidden rounded-md border">
      <img
        className="h-36 w-full border-b object-cover"
        src="https://images.unsplash.com/photo-1697016632998-af254f0c3153?auto=format&fit=crop&q=80&w=1632&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt={`${store.name} front page`}
      />
      <div className="relative">
        <img
          className="absolute top-0 ml-4 h-24 w-24 -translate-y-1/2 rounded-full border object-contain"
          src="https://http2.mlstatic.com/D_Q_NP_828918-MLA27343044756_052018-T.webp"
          alt={`${store.name} profile picture`}
        />
      </div>
      <div className="mt-12 space-y-1 p-4">
        <div className="flex items-start gap-1">
          <p className="text-base font-semibold leading-tight">{store.name}</p>
          {store.official && (
            <CheckBadgeIcon className="h-5 w-5 text-sky-600" />
          )}
        </div>
        <p className="text-sm font-normal leading-tight">{store.description}</p>
        <div>
          <ul>
            <li className="flex items-center gap-2 text-sm leading-tight text-muted-foreground">
              <CalendarDaysIcon className="h-4 w-4" />
              <span>Joined {Formatter.monthAndYearDate(store.createdAt)}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

StoreDetails.Skeleton = function StoreDetailsSkeleton() {
  return (
    <div className="overflow-hidden rounded-md border">
      <Skeleton className="h-36 w-full rounded-none" />
      <div className="relative">
        <div className="absolute top-0 ml-4 h-24 w-24 -translate-y-1/2 rounded-full border bg-neutral-100" />
      </div>
      <div className="mt-12 space-y-2 p-4">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};
