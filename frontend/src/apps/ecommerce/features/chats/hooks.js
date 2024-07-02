import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { useSocket } from "@/features/socket";
import { chatKeys } from "./queries";

export const useSocketEventHandler = () => {
  const queryClient = useQueryClient();

  const { socket } = useSocket();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isSuccess) return;

    socket.on("chat:message:new", (message) => {
      const chats = queryClient.getQueryData(chatKeys.chats());
      const chat = chats?.find((chat) => chat.id === message.chatId);

      queryClient.setQueryData(chatKeys.messages(chat.storeId), (oldData) => {
        if (!oldData) return oldData;
        return [...oldData, message];
      });
      queryClient.setQueryData(chatKeys.chats(), (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((chat) => {
          if (chat.id === message.chatId) {
            return {
              ...chat,
              messages: [message],
              updatedAt: message.createdAt,
            };
          }
          return chat;
        });
      });
    });

    return () => {
      socket.off("chat:message:new");
    };
  }, [auth.isSuccess, queryClient, socket]);
};
