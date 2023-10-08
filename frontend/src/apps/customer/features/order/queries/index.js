import { useQuery } from "@tanstack/react-query";
import { findAll, findOne } from "../api";

const orderKeys = {
  key: ["order"],
  findOne: (orderId) => [...orderKeys.key, "find-one", orderId],
  findAll: (query) => [...orderKeys.key, "find-all", query],
};

export const useGetOrder = (orderId) => {
  return useQuery({
    queryKey: orderKeys.findOne(orderId),
    queryFn: () => findOne(orderId),
    enabled: !!orderId,
  });
};

export const useGetOrders = (query) => {
  return useQuery({
    queryKey: orderKeys.findAll(query),
    queryFn: () => findAll(query),
  });
};
