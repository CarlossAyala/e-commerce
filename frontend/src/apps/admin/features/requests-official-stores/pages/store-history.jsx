import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArchiveBoxXMarkIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";
import {
  Badge,
  EmptyPlaceholder,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
} from "@/components";
import { useGetStoreById } from "@/apps/common";
import { requestOfficialStoreActionRoutes } from "../utils";
import { useGetHistoryRequestsOfficialStore } from "../queries";
import { StoreDetails } from "../components/store-details";
import { Formatter } from "@/utils";
import { Pagination } from "@/shared/components";

export const StoreHistory = () => {
  const { storeId } = useParams();
  const [params] = useSearchParams();

  const {
    data: requests,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetHistoryRequestsOfficialStore(storeId, params.toString());
  const store = useGetStoreById(storeId);

  const hasRequests = isSuccess && requests.rows.length > 0;
  const isEmpty = isSuccess && requests.rows.length === 0;

  return (
    <main className="space-y-6 overflow-auto p-4">
      <section className="space-y-1">
        <h2 className="text-2xl font-semibold leading-tight tracking-tight">
          Request Official Store History
        </h2>
        <p className="text-sm leading-tight text-muted-foreground">
          All requests to prove their identity to be verified.
        </p>
      </section>

      <section>
        {store.isLoading && <StoreDetails.Skeleton />}
        {store.isError && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
            <EmptyPlaceholder.Title>
              Error fetching store
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              {store.error.message}
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
        {store.isSuccess && (
          <div className="max-w-md">
            <StoreDetails store={store.data} />
          </div>
        )}
      </section>

      <section className="space-y-4">
        <Input type="text" name="search" className="h-9 max-w-sm" />

        {isLoading && <TableSkeleton />}
        {isError && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
            <EmptyPlaceholder.Title>
              Error fetching requests.
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              {error.message}
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
        {isEmpty && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={ArchiveBoxXMarkIcon} />
            <EmptyPlaceholder.Title>No requests found.</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              No one has requested to verify their store yet.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
        {hasRequests && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.rows.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="max-w-[120px] truncate font-medium">
                      {request.description}
                    </TableCell>
                    <TableCell className="capitalize">
                      <Badge variant="outline">{request.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {Formatter.shortDate(request.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={requestOfficialStoreActionRoutes.details(
                          request.id,
                        )}
                        className="hover:underline"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
        <Pagination count={requests?.count} />
      </section>
    </main>
  );
};
