import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useSocket } from "@/features/socket";
import { EmptyState, Spinner } from "@/shared/components";
import { cn, getInitials } from "@/shared/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  Skeleton,
  buttonVariants,
} from "@/shared/components";
import { useGetStore } from "../../stores";
import { formatDate } from "../utils";
import { chatKeys, useGetMessages, useSendMessage } from "../queries";
import { createSchema, messageInitial } from "../schemas";

export const Chat = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const store = useGetStore(storeId);
  const messages = useGetMessages(storeId);
  const sendMessage = useSendMessage(storeId);

  const form = useForm({
    resolver: yupResolver(createSchema),
    defaultValues: messageInitial,
    mode: "onSubmit",
  });

  const { socket } = useSocket();

  const inputRef = useRef();
  const containerMessagesRef = useRef();

  const handleSubmit = (values) => {
    sendMessage.mutate(values, {
      onSuccess(message) {
        form.reset();
        inputRef.current.focus();
        socket.emit("chat:message:send", {
          storeId,
          ...message,
        });
      },
    });
  };

  const handleCloseChat = () => {
    navigate("/chats");
  };

  useEffect(() => {
    if (!store.isSuccess) return;

    const checkChats = async () => {
      const chats = await queryClient.getQueryData(chatKeys.chats());
      const chat = chats?.find((chat) => chat.storeId === storeId);
      if (!chat) {
        await queryClient.invalidateQueries(chatKeys.chats());
      }
    };

    checkChats();
  }, [queryClient, storeId, store.isSuccess]);

  // scroll to bottom of messages

  useEffect(() => {
    if (messages.isSuccess) {
      containerMessagesRef.current.scrollTo(
        0,
        containerMessagesRef.current.scrollHeight,
      );
    }
  }, [messages.isSuccess, sendMessage.isSuccess]);

  // focus on the input when the storeId changes

  useEffect(() => {
    inputRef.current.focus();
  }, [storeId, messages.isSuccess]);

  // close the chat when the user presses the escape key

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseChat();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orderedMessages = messages.data?.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <section className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b px-4">
        <Button size="icon" variant="ghost" onClick={handleCloseChat}>
          <ArrowLeftIcon className="size-5" />
        </Button>
        {store.isLoading ? (
          <>
            <Skeleton className="size-9 shrink-0 rounded-full" />
            <Skeleton className="h-5 w-1/3" />
          </>
        ) : store.isError ? (
          <div>
            <p className="text-sm text-muted-foreground">
              Something went wrong!
            </p>
          </div>
        ) : (
          <Link
            to={`/stores/${storeId}`}
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "gap-2 p-0",
            )}
          >
            <Avatar>
              <AvatarImage src={store.data.url} alt="Avatar" />
              <AvatarFallback>{getInitials(store.data.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="line-clamp-1 font-medium">{store.data.name}</p>
            </div>
          </Link>
        )}
      </section>

      <section
        ref={containerMessagesRef}
        className={cn(
          "my-2 flex w-full flex-1 gap-4 overflow-y-auto px-4",
          messages.isSuccess ? "flex-col-reverse" : "flex-col",
        )}
      >
        {messages.isLoading ? (
          <>
            <Skeleton className="h-10 max-w-[75%]" />
            <Skeleton className="ml-auto h-24 w-full max-w-[75%]" />
            <Skeleton className="h-10 max-w-[75%]" />
          </>
        ) : messages.isError ? (
          <div className="flex h-full flex-col items-center justify-center">
            <EmptyState
              title="Could not load messages"
              className="border-none"
            />
          </div>
        ) : !messages.data.length ? (
          <div className="flex h-full" />
        ) : (
          orderedMessages.map((message, index) => (
            <div key={index}>
              <div
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.sender === "customer"
                    ? "ml-auto bg-secondary text-secondary-foreground"
                    : "bg-primary text-primary-foreground",
                )}
              >
                <p className="break-all">{message.text}</p>
              </div>
              <div className="mt-1">
                <p
                  className={cn(
                    "text-xs text-muted-foreground",
                    message.sender === "customer" ? "text-right" : "text-left",
                  )}
                >
                  {formatDate(message.createdAt)}
                </p>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="flex items-center px-4 pb-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex w-full items-center space-x-2"
          >
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Type your message..."
                      autoComplete="off"
                      {...field}
                      ref={inputRef}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="icon"
              disabled={!messages.isSuccess || sendMessage.isLoading}
              className="text-primary-foreground"
            >
              {sendMessage.isLoading ? (
                <Spinner className="size-5" />
              ) : (
                <PaperAirplaneIcon className="size-5" />
              )}
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
};
