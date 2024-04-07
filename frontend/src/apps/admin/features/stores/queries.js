import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { parseURLSearchParams } from "@/shared/utils";
import { findAll, findOne } from "./api";

const storeKeys = {
  key: ["admin/stores"],
  findOne: (storeId) => [...storeKeys.key, "find-one", storeId],
  findAllKey: () => [...storeKeys.key, "find-all"],
  findAll: (query) => [...storeKeys.findAllKey(), query],
};

export const useGetStores = (query) => {
  const { data: accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: storeKeys.findAll(_query),
    queryFn: () => findAll(query, accessToken),
  });
};

export const useGetStore = (storeId) => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: storeKeys.findOne(storeId),
    queryFn: () => findOne(storeId, accessToken),
    enabled: !!storeId,
  });
};
