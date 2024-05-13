import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { parseURLSearchParams } from "@/shared/utils";
import { count, findAll, findOne, growthStats } from "./api";

const storeKeys = {
  key: ["admin/stores"],
  findOne: (storeId) => [...storeKeys.key, "find-one", storeId],
  findAllKey: () => [...storeKeys.key, "find-all"],
  findAll: (query) => [...storeKeys.findAllKey(), query],
  count: () => [...storeKeys.key, "count"],
  growthStats: (query) => [...storeKeys.key, "growth-stats", query],
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

export const useGetStoresCount = () => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: storeKeys.count(),
    queryFn: () => count(accessToken),
  });
};

export const useGetStoresGrowthStats = (query) => {
  const { data: accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: storeKeys.growthStats(_query),
    queryFn: () => growthStats(query, accessToken),
  });
};
