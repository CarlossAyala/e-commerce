import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Skeleton,
} from "../../../../../components";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Formatter } from "../../../../../utils";

export const StoreProfile = ({ store }) => {
  return (
    <section className="rounded-b-md border-b lg:border-x">
      <div className="h-56">
        <img
          className="h-full w-full object-cover"
          src="https://pbs.twimg.com/profile_banners/3106820359/1592524330/1500x500"
          alt={`${store.name} Banner`}
        />
      </div>
      <div className="relative">
        <img
          className="absolute ml-4 h-32 w-32 -translate-y-1/2 rounded-full object-contain"
          src="https://http2.mlstatic.com/D_Q_NP_828918-MLA27343044756_052018-T.webp"
          alt={`${store.name} Profile Picture`}
        />
      </div>
      <div className="mt-16 space-y-2 px-4 pb-4 pt-2">
        <div className="flex items-center gap-1">
          <h2 className="text-xl font-bold">{store.name}</h2>
          {store.official && (
            <HoverCard>
              <HoverCardTrigger className="cursor-pointer">
                <CheckBadgeIcon className="h-5 w-5 text-sky-600" />
              </HoverCardTrigger>
              <HoverCardContent className="w-auto">
                <p className="text-sm font-semibold">Verified Store</p>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
        <p className="mt-2 text-sm leading-tight">{store.description}</p>
        <div>
          <ul>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDaysIcon className="h-4 w-4" />
              <span>Joined {Formatter.monthAndYearDate(store.createdAt)}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

StoreProfile.Skeleton = function StoreProfileSkeleton() {
  return (
    <section className="rounded-b-md border-b lg:border-x">
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
    </section>
  );
};
