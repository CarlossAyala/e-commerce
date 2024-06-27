import { useQuery } from "@tanstack/react-query";
import { randoms } from "./api";

const categoryKeys = {
  key: ["ecommerce/categories"],
  randoms: (categoryId) => [...categoryKeys.key, "randoms", categoryId],
};

export const useGetCategoryRandomProducts = (categoryId) => {
  return useQuery({
    queryKey: categoryKeys.randoms(categoryId),
    queryFn: () => randoms(categoryId),
    enabled: !!categoryId,
  });
};
