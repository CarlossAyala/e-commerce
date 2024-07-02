import { API_SELLER } from "@/configs";
import { fetcher } from "@/shared/utils";

const ENDPOINT = `${API_SELLER}/chats`;

export const findAllChats = async (accessToken) => {
  const url = ENDPOINT;
  return fetcher(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findAllMessages = async (accessToken, chatId) => {
  const url = `${ENDPOINT}/${chatId}/messages`;
  return fetcher(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const createMessage = async (accessToken, chatId, data) => {
  const url = `${ENDPOINT}/${chatId}/messages`;
  return fetcher(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
