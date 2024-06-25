import { useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { MagnifyingGlassMinusIcon } from "@heroicons/react/24/outline";
import { Input, Skeleton } from "@/components";
import { cn, socket } from "@/libs";
import { getInitials } from "@/utils";
import { formatDate } from "../utils";
import { chatKeys, useGetChats } from "../queries";
import { useGetStore } from "../../store";

export const Chats = () => {
  const { chatId } = useParams();
  const store = useGetStore();
  const queryClient = useQueryClient();
  const chats = useGetChats();

  useEffect(() => {
    if (!store.isSuccess) return;
    const { id: storeId } = store.data;

    socket.connect();

    socket.emit("chat:join", storeId);

    socket.on("chat:message:new", (message) => {
      queryClient.setQueryData(
        chatKeys.messages(String(message.chatId)),
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            messages: [...oldData.messages, message],
          };
        },
      );
      queryClient.setQueryData(chatKeys.chats(), (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((chat) => {
          if (chat.id === message.chatId) {
            return {
              ...chat,
              messages: [message],
              updatedAt: new Date().toISOString(),
            };
          }
          return chat;
        });
      });
    });

    return () => {
      socket.off("chat:message:new");
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.isSuccess]);

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
    <main className="flex flex-1 overflow-y-auto">
      <section className="flex shrink-0 basis-1/3 flex-col px-4 py-4 tablet:px-6">
        <div className="flex shrink-0 items-center">
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
                to={`/seller/chats/${chat.id}`}
                className={cn(
                  "flex items-center gap-2 p-2",
                  chatId === String(chat.id) && "bg-muted",
                )}
              >
                <div className="flex size-9 items-center justify-center rounded-full border border-primary bg-primary">
                  <p className="text-sm text-primary-foreground">
                    {getInitials(
                      `${chat.customer.name} ${chat.customer.lastName}`,
                    )}
                  </p>
                </div>
                <div className="grow text-sm text-primary">
                  <div className="flex items-end justify-between gap-2">
                    <p className="line-clamp-1 font-semibold">
                      {`${chat.customer.name} ${chat.customer.lastName}`}
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
                        {chat.messages[0].storeId && "You: "}
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
      <section className="grow overflow-y-auto border-l">
        <Outlet />
      </section>
    </main>
  );
};
