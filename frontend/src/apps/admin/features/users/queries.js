import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { createQueryKey, parseURLSearchParams } from "@/shared/utils";
import { count, growthStats } from "./api";

const userKeys = {
  key: createQueryKey({
    prefix: "admin",
    entity: "users",
  }),
  count: () => [...userKeys.key, "count"],
  growthStats: (query) => [...userKeys.key, "growth-stats", query],
};

export const useGetUsersCount = () => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: userKeys.count(),
    queryFn: () => count(accessToken),
  });
};

export const useGetUsersGrowthStats = (query) => {
  const { data: accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: userKeys.growthStats(_query),
    queryFn: () => growthStats(query, accessToken),
  });
};
