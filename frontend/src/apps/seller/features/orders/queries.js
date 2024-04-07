import { useQuery } from "@tanstack/react-query";
import { parseURLSearchParams } from "@/shared/utils";
import { useAuth } from "@/shared/auth";
import { findAll, findOne } from "./api";

export const orderKeys = {
  key: ["seller/orders"],
  findOne: (orderId) => [...orderKeys.key, "find-one", orderId],
  findAll: (query) => [...orderKeys.key, "find-all", query],
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
