import { useQuery } from "@tanstack/react-query";
import { createQueryKey, parseURLSearchParams } from "@/shared/utils";
import { useAuth } from "@/features/auth";
import { findAll, findItem, findOne } from "../api";

const orderKeys = {
  key: createQueryKey({
    prefix: "ecommerce",
    entity: "orders",
    config: {
      removeOnSignout: true,
    },
  }),
  findOne: (orderId) => [...orderKeys.key, "find-one", orderId],
  findAll: (query) => [...orderKeys.key, "find-all", query],
  findItem: (itemId) => [...orderKeys.key, "find-item", itemId],
};

export const useGetOrder = (orderId) => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: orderKeys.findOne(orderId),
    queryFn: () => findOne(orderId, accessToken),
    enabled: !!orderId,
  });
};

export const useGetOrders = (query) => {
  const { data: accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: orderKeys.findAll(_query),
    queryFn: () => findAll(query, accessToken),
  });
};

export const useGetOrderItem = (itemId) => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: orderKeys.findItem(itemId),
    queryFn: () => findItem(itemId, accessToken),
    enabled: !!itemId,
  });
};
