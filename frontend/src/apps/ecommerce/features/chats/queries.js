import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { createQueryKey } from "@/shared/utils";
import { findAllChats, findAllMessages, createMessage } from "./api";

export const chatKeys = {
  key: createQueryKey({
    prefix: "ecommerce",
    entity: "chats",
    config: {
      removeOnSignout: true,
    },
  }),
  chats: () => [...chatKeys.key, "all"],
  messages: (storeId) => [...chatKeys.key, storeId, "messages"],
};

export const useGetChats = () => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: chatKeys.chats(),
    queryFn: () => findAllChats(accessToken),
    staleTime: Number.POSITIVE_INFINITY,
    keepPreviousData: true,
  });
};

export const useGetMessages = (storeId) => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: chatKeys.messages(storeId),
    queryFn: () => findAllMessages(accessToken, storeId),
    enabled: !!storeId,
    staleTime: Number.POSITIVE_INFINITY,
  });
};

export const useSendMessage = (storeId) => {
  const { data: accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: chatKeys.messages(storeId),
    mutationFn: (values) => createMessage(accessToken, storeId, values),
    onSuccess: async () => {
      // reload chats when a new message is sent to a new store
      const chats = queryClient.getQueryData(chatKeys.chats());
      const chat = chats?.find((chat) => chat.storeId === storeId);
      if (!chat) {
        await queryClient.invalidateQueries(chatKeys.chats());
      }
    },
  });
};
