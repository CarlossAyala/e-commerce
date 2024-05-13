import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { count } from "./api";

const productKeys = {
  key: ["admin/products"],
  count: () => [...productKeys.key, "count"],
};

export const useGetProductsCount = () => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: productKeys.count(),
    queryFn: () => count(accessToken),
  });
};
