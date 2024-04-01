import { useParams } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks";
import { EmptyState, PublicStoreProfile } from "@/shared/components";
import { useGetStore } from "../queries";

export const StoreProfile = () => {
  const { storeId } = useParams();
  const { data: store, isLoading, isError, error } = useGetStore(storeId);
  useDocumentTitle(store?.name ?? "Store");

  return (
    <>
      {isLoading ? (
        <PublicStoreProfile.Skeleton />
      ) : isError ? (
        <EmptyState
          title="Error"
          description={error.message}
          className="mt-4"
        />
      ) : (
        <PublicStoreProfile store={store} />
      )}
    </>
  );
};
