import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { findAllChats, findAllMessages, createMessage } from "./api";

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
    keepPreviousData: true,
  });
};

export const useGetMessages = (storeId) => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: chatKeys.messages(storeId),
    queryFn: () => findAllMessages(accessToken, storeId),
    enabled: !!storeId,
    staleTime: Infinity,
  });
};

export const useSendMessage = (storeId) => {
  const { data: accessToken } = useAuth();
  // const queryClient = useQueryClient();

  return useMutation({
    mutationKey: chatKeys.messages(storeId),
    mutationFn: (values) => createMessage(accessToken, storeId, values),
  });
};
