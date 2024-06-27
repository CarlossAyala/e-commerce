import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@/shared/socket";
import { useAuth } from "@/shared/auth";
import { chatKeys } from "../features/chats/queries";

export const SocketEventHandler = ({ children }) => {
  const queryClient = useQueryClient();

  const { socket } = useSocket();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isSuccess) return;

    socket.on("chat:message:new", (message) => {
      if (message.from !== "customer") {
        message.customerId = null;
      }

      queryClient.setQueryData(
        chatKeys.messages(message.storeId),
        (oldData) => {
          if (!oldData) return oldData;
          return [...oldData, message];
        },
      );
      queryClient.setQueryData(chatKeys.chats(), (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((chat) => {
          if (chat.storeId === message.storeId) {
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

  return children;
};
