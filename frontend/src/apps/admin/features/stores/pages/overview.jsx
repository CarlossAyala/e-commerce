import { Link, useSearchParams } from "react-router-dom";
import {
  ArchiveBoxXMarkIcon,
  EllipsisHorizontalIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
import { Formatter } from "@/utils";
import { useGetRequestsOfficialStores } from "../queries";
import { requestOfficialStoreActionRoutes } from "../utils";
import { Pagination } from "@/shared/components";

export const Overview = () => {
  const [params] = useSearchParams();

  const {
    data: requests,
    isLoading,
    isError,
    error,
  } = useGetRequestsOfficialStores(params.toString());

  const hasRequests = requests?.rows.length > 0;
  const isEmpty = requests?.rows.length === 0;

  return (
    <main className="space-y-6 overflow-auto p-4">
      <section className="space-y-1">
        <h2 className="text-2xl font-semibold leading-tight tracking-tight">
          Request Official Stores Overview
        </h2>
        <p className="text-sm leading-tight text-muted-foreground">
          Requests stores to prove their identity to be verified.
        </p>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.rows.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="max-w-[120px] truncate font-medium">
                    {request.store.name}
                  </TableCell>
                  <TableCell className="capitalize">
                    <Badge variant="outline">{request.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {Formatter.shortDate(request.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                        >
                          <EllipsisHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem asChild>
                          <Link
                            to={requestOfficialStoreActionRoutes.details(
                              request.id,
                            )}
                          >
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            to={requestOfficialStoreActionRoutes.history(
                              request.storeId,
                            )}
                          >
                            History
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Pagination count={requests?.count} />
      </section>
    </main>
  );
};