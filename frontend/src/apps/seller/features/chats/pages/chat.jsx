import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { EmptyState, Spinner } from "@/shared/components";
import { useSocket } from "@/features/socket";
import { cn, getInitials } from "@/shared/utils";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  Skeleton,
} from "@/shared/components";
import { formatDate } from "../utils";
import { useGetChats, useGetMessages, useSendMessage } from "../queries";
import { createSchema, messageInitial } from "../schemas";

export const Chat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const { socket } = useSocket();
  const chats = useGetChats();
  const messages = useGetMessages(chatId);
  const sendMessage = useSendMessage(chatId);

  const chat = chats.data?.find((chat) => String(chat.id) === chatId);

  const form = useForm({
    resolver: yupResolver(createSchema),
    defaultValues: messageInitial,
    mode: "onSubmit",
  });

  const inputRef = useRef();
  const containerMessagesRef = useRef();

  const handleSubmit = (values) => {
    sendMessage.mutate(values, {
      onSuccess(message) {
        form.reset();
        socket.emit("chat:message:send", {
          customerId: chat.customerId,
          ...message,
        });
      },
    });
  };

  const handleCloseChat = () => {
    navigate("/seller/chats");
  };

  useEffect(() => {
    if (messages.isSuccess) {
      containerMessagesRef.current.scrollTo(
        0,
        containerMessagesRef.current.scrollHeight,
      );
      inputRef.current.focus();
    }
  }, [messages.isSuccess, chatId, sendMessage.isSuccess]);

  // focus on the input when the storeId changes

  useEffect(() => {
    inputRef.current.focus();
  }, [chatId, messages.isSuccess]);

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

        {chats.isLoading ? (
          <>
            <Skeleton className="size-9 shrink-0 rounded-full" />
            <div className="grow space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </>
        ) : chats.isError ? (
          <div>
            <p className="text-sm text-muted-foreground">
              Something went wrong!
            </p>
          </div>
        ) : !chat ? (
          <div>
            <p className="text-sm text-muted-foreground">Chat not found</p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-full border">
              {getInitials(`${chat.customer.name} ${chat.customer.lastName}`)}
            </div>
            <div>
              <p className="line-clamp-1 font-medium leading-5">{`${chat.customer.name} ${chat.customer.lastName}`}</p>
              <p className="line-clamp-1 text-sm leading-4 text-muted-foreground">
                {chat.customer.email}
              </p>
            </div>
          </div>
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
                  message.sender === "store"
                    ? "ml-auto bg-muted"
                    : "bg-primary text-primary-foreground",
                )}
              >
                <p className="break-all">{message.text}</p>
              </div>
              <div className="mt-1">
                <p
                  className={cn(
                    "text-xs text-muted-foreground",
                    message.sender === "store" ? "text-right" : "text-left",
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
                      disabled={!messages.isSuccess || sendMessage.isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="icon"
              disabled={!messages.isSuccess || sendMessage.isLoading}
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
