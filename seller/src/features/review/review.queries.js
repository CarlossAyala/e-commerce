import { useQuery } from "@tanstack/react-query";
import API from "./review.api";

const reviewKeys = {
  key: ["review"],
  getAll: (query = "") => [...reviewKeys.key, "get-all", query],
};

export const useGetReviews = (query) => {
  return useQuery({
    queryKey: reviewKeys.getAll(query),
    queryFn: () => API.getAll(query),
  });
};
