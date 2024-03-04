import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { parseURLSearchParams } from "@/shared/utils";
import { useAuth } from "@/shared/auth";
import { create, findAllDone, findAllPending } from "../api";

export const reviewKeys = {
  key: ["customer/review"],
  findAllDoneKey: () => [...reviewKeys.key, "find-all-done"],
  findAllDone: (query) => [...reviewKeys.findAllDoneKey(), query],
  findAllPendingKey: () => [...reviewKeys.key, "find-all-pending"],
  findAllPending: (query) => [...reviewKeys.findAllPendingKey(), query],
};

export const useGetReviewsDone = (query) => {
  const { accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: reviewKeys.findAllDone(_query),
    queryFn: () => findAllDone(query, accessToken),
  });
};

export const useGetReviewsPending = (query) => {
  const { accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: reviewKeys.findAllPending(_query),
    queryFn: () => findAllPending(query, accessToken),
  });
};

export const useCreateReview = (orderItemId) => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (values) => create(orderItemId, values, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewKeys.findAllDoneKey(),
      });
      queryClient.invalidateQueries({
        queryKey: reviewKeys.findAllPendingKey(),
      });
    },
  });
};
