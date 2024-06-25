import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { findAllChats, findAllMessages, createMessage } from "./api";

export const chatKeys = {
  key: ["seller/chats"],
  chats: () => [...chatKeys.key, "all"],
  messages: (chatId) => [...chatKeys.key, chatId, "messages"],
};

export const useGetChats = () => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: chatKeys.chats(),
    queryFn: () => findAllChats(accessToken),
    staleTime: Infinity,
  });
};

export const useGetMessages = (chatId) => {
  const { data: accessToken } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: chatKeys.messages(chatId),
    queryFn: () => findAllMessages(accessToken, chatId),
    enabled: !!chatId,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!query.isSuccess) return;

    queryClient.invalidateQueries(chatKeys.chats());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.isSuccess]);

  return query;
};

export const useSendMessage = (chatId) => {
  const { data: accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: chatKeys.messages(chatId),
    mutationFn: (values) => createMessage(accessToken, chatId, values),
    onSuccess: (message) => {
      queryClient.setQueryData(chatKeys.messages(chatId), (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          messages: [...oldData.messages, message],
        };
      });
      queryClient.setQueryData(chatKeys.chats(), (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((chat) => {
          if (String(chat.id) === chatId) {
            return {
              ...chat,
              messages: [message],
              updatedAt: new Date().toISOString(),
            };
          }
          return chat;
        });
      });
    },
  });
};
