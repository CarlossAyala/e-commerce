import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { useSocket } from "@/features/socket";
import { chatKeys, useGetChats } from "./queries";

export const useSocketEventHandler = () => {
  const queryClient = useQueryClient();

  const { socket } = useSocket();
  const auth = useAuth();
  const chats = useGetChats();

  useEffect(() => {
    if (!auth.isSuccess) return;

    socket.on("chat:message:new", async (message) => {
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
            }

            return chat;
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
};
