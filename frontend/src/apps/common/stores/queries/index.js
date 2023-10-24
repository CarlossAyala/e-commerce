import { useQuery } from "@tanstack/react-query";
import { findById } from "../api";

const storeKeys = {
  key: ["common/store"],
  findById: (storeId) => [...storeKeys.key, "find-by-id", storeId],
};

export const useGetStoreById = (storeId) => {
  return useQuery({
    queryKey: storeKeys.findById(storeId),
    queryFn: () => findById(storeId),
    enabled: !!storeId,
  });
};
