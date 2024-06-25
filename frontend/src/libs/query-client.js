import { MutationCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
  mutationCache: new MutationCache({
    onError(error, _variables, _context, mutation) {
      const title = mutation.meta?.title ?? "Error";
      const description = error?.message ?? "Something went wrong";

      toast.message(title, {
        description,
      });
    },
  }),
});
