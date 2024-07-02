import { useQuery } from "@tanstack/react-query";
import { createQueryKey } from "@/shared/utils";
import { randoms } from "./api";

const categoryKeys = {
  key: createQueryKey({
    prefix: "ecommerce",
    entity: "categories",
  }),
  randoms: (categoryId) => [...categoryKeys.key, "randoms", categoryId],
};

export const useGetCategoryRandomProducts = (categoryId) => {
  return useQuery({
    queryKey: categoryKeys.randoms(categoryId),
    queryFn: () => randoms(categoryId),
    enabled: !!categoryId,
  });
};
