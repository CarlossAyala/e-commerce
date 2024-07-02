import { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { MagnifyingGlassMinusIcon } from "@heroicons/react/24/outline";
import { useDebounced } from "@/shared/hooks";
import { cn, getInitials } from "@/shared/utils";
import { Input, Skeleton } from "@/shared/components";
import { formatDate } from "../utils";
import { useGetChats } from "../queries";

export const Chats = () => {
  const [search, setSearch] = useState("");
  const { chatId } = useParams();

  const debouncedSearch = useDebounced(search);
  const chats = useGetChats();

  const sortByDate = chats.data?.sort((a, b) => {
    const aDate = new Date(
      a.messages.length ? a.messages[0].createdAt : a.updatedAt,
    );
    const bDate = new Date(
      b.messages.length ? b.messages[0].createdAt : b.updatedAt,
    );
    return bDate - aDate;
  });

  const sortBySearch = sortByDate?.filter((chat) => {
    const customer =
      `${chat.customer.name} ${chat.customer.lastName}`.toLowerCase();
    return customer.includes(debouncedSearch.toLowerCase());
  });

  return (
    <main className="grid size-full overflow-y-auto lg:grid-cols-6">
      <section
        className={cn(
          "flex flex-col gap-4 p-4 lg:col-span-2 lg:flex lg:px-6",
          chatId && "hidden",
        )}
      >
        <div className="flex shrink-0 items-center">
          <h2 className="text-xl font-semibold">Chats</h2>
        </div>
        <div className="relative">
          <MagnifyingGlassMinusIcon className="absolute left-2 top-2 size-5 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grow flex-col-reverse divide-y overflow-hidden overflow-y-auto rounded-md border">
          {chats.isLoading ? (
            new Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-2 p-2">
                <Skeleton className="size-10 shrink-0 rounded-full" />
                <div className="grow space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))
          ) : chats.isError ? (
            <div className="flex h-full flex-col items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Could not load chats
              </p>
            </div>
          ) : !chats.data.length || !sortBySearch.length ? (
            <div className="flex h-full flex-col items-center justify-center">
              <p className="text-sm text-muted-foreground">No chats found</p>
            </div>
          ) : (
            sortBySearch.map((chat) => (
              <Link
                key={chat.id}
                to={`/seller/chats/${chat.id}`}
                className={cn(
                  "flex items-center gap-2 p-2 hover:bg-muted",
                  chatId === String(chat.id) && "bg-muted",
                )}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary bg-primary">
                  <p className="text-sm text-primary-foreground">
                    {getInitials(
                      `${chat.customer.name} ${chat.customer.lastName}`,
                    )}
                  </p>
                </div>
                <div className="grow text-sm">
                  <div className="flex items-end justify-between gap-2">
                    <p className="line-clamp-1 font-semibold">
                      {`${chat.customer.name} ${chat.customer.lastName}`}
                    </p>
                    <p className="shrink-0 text-xs text-muted-foreground">
                      {formatDate(chat.messages[0].createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="line-clamp-1 text-muted-foreground">
                      {chat.messages[0].sender === "store" && "You: "}
                      {chat.messages[0].text}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
      <section
        className={cn(
          "hidden overflow-y-auto lg:col-span-4 lg:grid lg:border-l",
          chatId && "grid",
        )}
      >
        <Outlet />
      </section>
    </main>
  );
};
