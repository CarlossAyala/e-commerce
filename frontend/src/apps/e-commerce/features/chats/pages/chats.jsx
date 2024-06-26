import { Link, Outlet, useParams } from "react-router-dom";
import { MagnifyingGlassMinusIcon } from "@heroicons/react/24/outline";
import { useDocumentTitle } from "@/shared/hooks";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
  Skeleton,
} from "@/components";
import { cn } from "@/libs";
import { getInitials } from "@/utils";
import { formatDate } from "../utils";
import { useGetChats } from "../queries";

export const Chats = () => {
  const { storeId } = useParams();

  useDocumentTitle("Chats");
  const chats = useGetChats();

  const orderedChats = chats.data?.sort((a, b) => {
    const aDate = new Date(
      a.messages.length ? a.messages[0].createdAt : a.updatedAt,
    );
    const bDate = new Date(
      b.messages.length ? b.messages[0].createdAt : b.updatedAt,
    );
    return bDate - aDate;
  });

  return (
    <main className="container flex min-h-[calc(100vh-56px)] flex-1 overflow-y-auto">
      <div className="my-6 grid w-full grid-cols-6 rounded-md border">
        <section className="col-span-2 flex flex-col px-4 pb-4">
          <div className="mt-4 flex shrink-0 items-center justify-between">
            <h2 className="text-xl font-semibold text-primary">Chats</h2>
          </div>
          <div className="relative my-4">
            <MagnifyingGlassMinusIcon className="absolute left-2 top-2 size-5 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
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
            ) : !chats.data.length ? (
              <div className="flex h-full flex-col items-center justify-center">
                <p className="text-sm text-muted-foreground">No chats found</p>
              </div>
            ) : (
              orderedChats.map((chat) => (
                <Link
                  key={chat.id}
                  to={`/chats/${chat.storeId}`}
                  className={cn(
                    "flex items-center gap-2 p-2",
                    storeId === chat.storeId && "bg-muted",
                  )}
                >
                  <Avatar>
                    <AvatarImage src={chat.store.url} alt="Avatar" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(chat.store.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grow text-sm text-primary">
                    <div className="flex items-end justify-between gap-2">
                      <p className="line-clamp-1 font-semibold">
                        {chat.store.name}
                      </p>
                      <p className="shrink-0 text-xs text-muted-foreground">
                        {formatDate(
                          chat.messages.length
                            ? chat.messages[0].createdAt
                            : chat.updatedAt,
                        )}
                      </p>
                    </div>
                    {chat.messages.length > 0 && (
                      <div>
                        <p className="line-clamp-1 text-muted-foreground">
                          {chat.messages[0].customerId && "You: "}
                          {chat.messages[0].text}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
        <section className="col-span-4 overflow-y-auto border-l">
          <Outlet />
        </section>
      </div>
    </main>
  );
};
