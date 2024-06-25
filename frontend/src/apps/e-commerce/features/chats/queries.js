import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { findAllChats, findAllMessages, createMessage } from "./api";
import { useEffect } from "react";

export const chatKeys = {
  key: ["ecommerce/chats"],
  chats: () => [...chatKeys.key, "all"],
  messages: (storeId) => [...chatKeys.key, storeId, "messages"],
};

export const useGetChats = () => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: chatKeys.chats(),
    queryFn: () => findAllChats(accessToken),
    staleTime: Infinity,
  });
};

export const useGetMessages = (storeId) => {
  const { data: accessToken } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: chatKeys.messages(storeId),
    queryFn: () => findAllMessages(accessToken, storeId),
    enabled: !!storeId,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!query.isSuccess) return;

    queryClient.invalidateQueries(chatKeys.chats());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.isSuccess]);

  return query;
};

export const useSendMessage = (storeId) => {
  const { data: accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: chatKeys.messages(storeId),
    mutationFn: (values) => createMessage(accessToken, storeId, values),
    onSuccess: (message) => {
      const chat = queryClient
        .getQueryData(chatKeys.chats())
        ?.find((chat) => chat.storeId === storeId);
      queryClient.setQueryData(chatKeys.messages(storeId), (oldData) => {
        if (!oldData) return oldData;
        return {
          ...chat,
          messages: [...oldData.messages, message],
        };
      });
      queryClient.setQueryData(chatKeys.chats(), (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((chat) => {
          if (chat.storeId === storeId) {
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
