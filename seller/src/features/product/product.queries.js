import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "./product.api";
import { getToken } from "../../api";

const productKeys = {
  key: ["product"],
  get: (id) => [...productKeys.key, "get", id],
  getAll: (query) => [...productKeys.key, "get-all", query],
};

export const useGetProducts = (query) => {
  const token = getToken();

  return useQuery({
    queryKey: productKeys.getAll(query),
    queryFn: () => API.getProducts(query),
    enabled: Boolean(token),
  });
};
