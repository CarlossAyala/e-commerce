import { useQuery } from "@tanstack/react-query";
import { parseURLSearchParams } from "@/shared/utils";
import { useAuth } from "@/shared/auth";
import { findAll, findOne } from "../api";

export const orderKeys = {
  key: ["seller/orders"],
  findOne: (saleId) => [...orderKeys.key, "find-one", saleId],
  findAll: (search) => [...orderKeys.key, "find-all", search],
};

export const useGetOrder = (id) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: orderKeys.findOne(id),
    queryFn: () => findOne(id, accessToken),
    enabled: !!id,
  });
};

export const useGetOrders = (search) => {
  const { accessToken } = useAuth();
  const params = parseURLSearchParams(search);

  return useQuery({
    queryKey: orderKeys.findAll(params),
    queryFn: () => findAll(search, accessToken),
  });
};
