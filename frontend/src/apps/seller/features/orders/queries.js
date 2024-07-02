import { useQuery } from "@tanstack/react-query";
import { createQueryKey, parseURLSearchParams } from "@/shared/utils";
import { useAuth } from "@/features/auth";
import { findAll, findOne, latestOrders } from "./api";

export const orderKeys = {
  key: createQueryKey({
    prefix: "seller",
    entity: "orders",
    config: {
      removeOnSignout: true,
    },
  }),
  findOne: (orderId) => [...orderKeys.key, "find-one", orderId],
  findAll: (query) => [...orderKeys.key, "find-all", query],
  findLatestOrders: () => [...orderKeys.key, "find-latest-orders"],
  growthStats: (query) => [...orderKeys.key, "growth-stats", query],
};

export const useGetOrder = (id) => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: orderKeys.findOne(id),
    queryFn: () => findOne(id, accessToken),
    enabled: !!id,
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

export const useGetLatestOrders = () => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: orderKeys.findLatestOrders(),
    queryFn: () => latestOrders(accessToken),
  });
};
