import { useQuery } from "@tanstack/react-query";
import { parseURLSearchParams } from "@/shared/utils";
import { useAuth } from "@/shared/auth";
import { findAll, findItem, findOne } from "../api";

const orderKeys = {
  key: ["e-commerce/order"],
  findOne: (orderId) => [...orderKeys.key, "find-one", orderId],
  findAll: (query) => [...orderKeys.key, "find-all", query],
  findItem: (itemId) => [...orderKeys.key, "find-item", itemId],
};

export const useGetOrder = (orderId) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: orderKeys.findOne(orderId),
    queryFn: () => findOne(orderId, accessToken),
    enabled: !!orderId,
  });
};

export const useGetOrders = (query) => {
  const { accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: orderKeys.findAll(_query),
    queryFn: () => findAll(query, accessToken),
  });
};

export const useGetOrderItem = (itemId) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: orderKeys.findItem(itemId),
    queryFn: () => findItem(itemId, accessToken),
    enabled: !!itemId,
  });
};
