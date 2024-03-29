import { Skeleton } from "./ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export const TableSkeleton = ({ action = true }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="h-4 w-28" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-28" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-28" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-28" />
          </TableHead>
          {action && <TableHead>{null}</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {new Array(5).fill("").map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-64 bg-primary/60" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-28 bg-primary/30" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-28 bg-primary/30" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-28 bg-primary/30" />
            </TableCell>
            {action && (
              <TableCell className="py-4">
                <Skeleton className="h-4 w-12 bg-indigo-300" />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
