import { useQuery } from "@tanstack/react-query";
import { findAll, findOne } from "../api";

const orderKeys = {
  key: ["order"],
  findOne: (orderId) => [...orderKeys.key, "find-one", orderId],
  findAll: (query) => [...orderKeys.key, "find-all", query],
};

export const useGetOrder = (orderId) => {
  const value = useQuery({
    queryKey: orderKeys.findOne(orderId),
    queryFn: () => findOne(orderId),
    enabled: !!orderId,
  });

  return {
    details: value.data,
    ...value,
  };
};

export const useGetOrders = (query) => {
  const values = useQuery({
    queryKey: orderKeys.findAll(query),
    queryFn: () => findAll(query),
  });

  return {
    orders: values.data?.rows,
    count: values.data?.count,
    isEmpty: values.data?.rows.length === 0,
    ...values,
  };
};
