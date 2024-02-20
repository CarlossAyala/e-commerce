import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authKeys } from "./auth";
import {
  AUTH_INVALID_CLIENT,
  AUTH_INVALID_REQUEST,
  AUTH_INVALID_TOKEN,
} from "@/utils/errors";
import { SessionStorage } from "@/utils";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    // eslint-disable-next-line no-unused-vars
    onError(error, query) {
      // console.group("QueryCache");
      // console.log(error);
      // console.log(query);
      // console.groupEnd();

      const title = error.meta?.title ?? "Error";
      const description = error.message ?? "Something went wrong";

      console.log("switch (error.name)", error.name);
      switch (error.name) {
        case AUTH_INVALID_CLIENT:
        case AUTH_INVALID_REQUEST: {
          SessionStorage.save("attempt_silent_auth", true);
          queryClient.removeQueries(authKeys.accessToken());
          queryClient.removeQueries(authKeys.profile());
          break;
        }
        case AUTH_INVALID_TOKEN: {
          SessionStorage.save("attempt_silent_auth", true);
          queryClient.invalidateQueries(authKeys.accessToken());
          queryClient.invalidateQueries(authKeys.profile());
          break;
        }
        default: {
          toast.message(title, {
            description,
          });
        }
      }
    },
  }),
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
