import { useParams } from "react-router-dom";
import { useGetRequestOfficialStore } from "../queries";
import { requestOfficialStoreStatus } from "../utils";
import { RequestForm } from "../components/request-form";
import { RequestDetails } from "../components/request-details";
import { StoreDetails } from "../components/store-details";
import { Formatter } from "../../../../../utils";
import { EmptyPlaceholder } from "../../../../../components";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { RequestSkeleton } from "../components/request-skeleton";

export const Details = () => {
  const { requestId } = useParams();
  const {
    data: request,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetRequestOfficialStore(requestId);

  return (
    <main className="mx-auto  max-w-xl space-y-6 overflow-auto p-4">
      <section className="space-y-1">
        <h2 className="text-2xl font-semibold leading-tight tracking-tight">
          Request Official Store Details
        </h2>
        <p className="text-sm leading-tight text-muted-foreground">
          Request store to prove their identity to be verified.
        </p>
      </section>

      <section className="space-y-6">
        {isLoading && (
          <>
            <StoreDetails.Skeleton />
            <RequestSkeleton />
          </>
        )}
        {isError && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
            <EmptyPlaceholder.Title>
              Error fetching request
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              {error.message}
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
        {isSuccess && (
          <>
            <div className="space-y-2">
              <p className="text-sm font-semibold leading-tight">Store</p>
              <StoreDetails store={request.store} />
            </div>

            {request.status === requestOfficialStoreStatus.process ? (
              <>
                <div className="space-y-1">
                  <p className="text-sm font-semibold leading-tight">Date</p>
                  <p className="text-sm font-normal leading-tight">
                    {Formatter.shortDate(request.createdAt)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold leading-tight">Request</p>
                  <p className="text-sm font-normal leading-tight">
                    {request.description}
                  </p>
                </div>

                <RequestForm requestId={requestId} />
              </>
            ) : (
              <RequestDetails request={request} />
            )}
          </>
        )}
      </section>
    </main>
  );
};
