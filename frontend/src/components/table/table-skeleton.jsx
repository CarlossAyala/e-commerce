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

const TableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {[...Array(COLUMNS)].map((_, index) => (
            <TableCell key={index}>
              <Skeleton className="h-5 w-3/4 rounded sm:w-1/3" />
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(ROWS)].map((_, index) => (
          <TableRow key={index}>
            {[...Array(COLUMNS)].map((_, index) => (
              <TableCell key={index}>
                <Skeleton className="h-5 w-full  rounded sm:w-3/4" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
