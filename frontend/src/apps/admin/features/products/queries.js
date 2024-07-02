import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { createQueryKey } from "@/shared/utils";
import { count } from "./api";

const productKeys = {
  key: createQueryKey({
    prefix: "admin",
    entity: "products",
  }),
  count: () => [...productKeys.key, "count"],
};

export const useGetProductsCount = () => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: productKeys.count(),
    queryFn: () => count(accessToken),
  });
};
