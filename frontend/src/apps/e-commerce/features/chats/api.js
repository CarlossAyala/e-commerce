import { API_ECOMMERCE } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_ECOMMERCE}/chats`;

export const findAllChats = async (accessToken) => {
  const url = ENDPOINT;
  return fetcher(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findAllMessages = async (accessToken, storeId) => {
  const url = `${ENDPOINT}/${storeId}/messages`;
  return fetcher(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const createMessage = async (accessToken, storeId, data) => {
  const url = `${ENDPOINT}/${storeId}/messages`;
  return fetcher(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
