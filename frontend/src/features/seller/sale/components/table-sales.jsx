import { DataTable } from "../../../../components";
import { salesColumns } from "../columns";
import { useGetSales } from "../queries";

const TableSales = () => {
  const { isLoading, isError, error, data } = useGetSales();
  console.log("Sales", data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error - {error?.message ?? "Oops"}</div>;
  if (data.rows.length === 0) return <div>No sales</div>;

  // if (data.rows.length > 0)
  return <DataTable columns={salesColumns} data={data?.rows} />;
};

export default TableSales;
