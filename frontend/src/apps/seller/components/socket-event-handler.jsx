import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@/shared/socket";
import { useAuth } from "@/shared/auth";
import { chatKeys, useGetChats } from "../features/chats/queries";

export const SocketEventHandler = ({ children }) => {
  const queryClient = useQueryClient();

  const { socket } = useSocket();
  const auth = useAuth();
  const chats = useGetChats();

  useEffect(() => {
    if (!auth.isSuccess) return;

    socket.on("chat:message:new", async (message) => {
      if (message.from !== "store") {
        message.storeId = null;
      }

      const chat = chats.data?.find((chat) => chat.id === message.chatId);
      if (chat) {
        queryClient.setQueryData(chatKeys.chats(), (oldData) => {
          return oldData.map((chat) => {
            if (chat.id === message.chatId) {
              return {
                ...chat,
                messages: [message],
                updatedAt: message.createdAt,
              };
            } else return chat;
          });
        });
      } else {
        await queryClient.invalidateQueries(chatKeys.chats());
      }

      const messages = queryClient.getQueryData(
        chatKeys.messages(String(message.chatId)),
      );
      if (messages) {
        queryClient.setQueryData(
          chatKeys.messages(String(message.chatId)),
          (oldData) => [...oldData, message],
        );
      } else {
        await queryClient.invalidateQueries(
          chatKeys.messages(String(message.chatId)),
        );
      }
    });

    return () => {
      socket.off("chat:message:new");
    };
  }, [auth.isSuccess, chats.data, queryClient, socket]);

  return children;
};
