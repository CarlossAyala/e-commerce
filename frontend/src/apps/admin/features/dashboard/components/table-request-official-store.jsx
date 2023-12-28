import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableError,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
} from "../../../../../components";
import { Formatter } from "../../../../../utils";
import {
  requestOfficialStoreActionRoutes,
  useGetRequestsOfficialStores,
} from "../../requests-official-stores";
import { Link } from "react-router-dom";

export const TableRequestOfficialStore = () => {
  const requests = useGetRequestsOfficialStores("status=approved");

  const isEmpty = requests.isSuccess && requests.data?.rows.length === 0;
  const hasContent = requests.isSuccess && requests.data?.rows.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Requests Official Stores</CardTitle>
      </CardHeader>
      <CardContent>
        {requests.isLoading && <TableSkeleton />}
        {requests.isError && <TableError />}
        {isEmpty && <TableEmpty />}
        {hasContent && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.data.rows.map((request) => (
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
      </CardContent>
    </Card>
  );
};
