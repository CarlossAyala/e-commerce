import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@carbon/react";
import Pagination from "../pagination/pagination";

const TableBasic = ({ rows, headers, count, hasPagination = false }) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader
                  id={header.key}
                  key={header.key}
                  className="uppercase"
                >
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {Object.keys(row)
                  .filter((key) => key !== "id")
                  .map((key) => {
                    return <TableCell key={key}>{row[key]}</TableCell>;
                  })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {hasPagination && <Pagination count={count} />}
    </>
  );
};

export default TableBasic;
