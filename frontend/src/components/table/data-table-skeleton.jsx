import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

const ROWS = 8;
const COLUMNS = 3;

const DataTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {[...Array(COLUMNS)].map((_, index) => (
            <TableCell key={index}>
              <Skeleton className="h-5 w-24 rounded" />
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(ROWS)].map((_, index) => (
          <TableRow key={index}>
            {[...Array(COLUMNS)].map((_, index) => (
              <TableCell key={index}>
                <Skeleton className="h-5 w-24 rounded" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTableSkeleton;
