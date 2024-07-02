import { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { MagnifyingGlassMinusIcon } from "@heroicons/react/24/outline";
import { useDebounced, useDocumentTitle } from "@/shared/hooks";
import { cn, getInitials } from "@/shared/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
  Skeleton,
} from "@/shared/components";
import { formatDate } from "../utils";
import { useGetChats } from "../queries";

export const Chats = () => {
  const { storeId } = useParams();
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounced(search);
  useDocumentTitle("Chats");
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
    return chat.store.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
  });

  return (
    <main className="flex min-h-[calc(100vh-57px)] flex-1 overflow-y-auto md:container">
      <div className="grid w-full md:my-6 md:grid-cols-6 md:rounded-md md:border">
        <section
          className={cn(
            "flex-col space-y-4 p-4 md:col-span-2",
            storeId ? "hidden md:flex" : "flex",
          )}
        >
          <div className="flex shrink-0 items-center justify-between">
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
                  to={`/chats/${chat.storeId}`}
                  className={cn(
                    "flex items-center gap-2 p-2 hover:bg-muted",
                    storeId === chat.storeId && "bg-muted",
                  )}
                >
                  <Avatar>
                    <AvatarImage src={chat.store.url} alt="Avatar" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(chat.store.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grow text-sm">
                    <div className="flex items-end justify-between gap-2">
                      <p className="line-clamp-1 font-semibold">
                        {chat.store.name}
                      </p>
                      <p className="shrink-0 text-xs text-muted-foreground">
                        {formatDate(chat.messages[0].createdAt)}
                      </p>
                    </div>
                    <div>
                      <p className="line-clamp-1 text-muted-foreground">
                        {chat.messages[0].sender === "customer" && "You: "}
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
            "hidden overflow-y-auto md:col-span-4 md:grid md:border-l",
            storeId && "grid",
          )}
        >
          <Outlet />
        </section>
      </div>
    </main>
  );
};
