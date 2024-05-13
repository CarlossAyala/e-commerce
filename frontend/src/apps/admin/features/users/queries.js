import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { count, growthStats } from "./api";
import { parseURLSearchParams } from "@/shared/utils";

const userKeys = {
  key: ["admin/users"],
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
