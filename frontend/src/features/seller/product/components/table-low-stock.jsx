import { DataTable } from "../../../../components";
import { lowStockColumns } from "../columns";
import { useGetLowStockProducts } from "../queries";

const TableLowStock = () => {
  const { isLoading, isError, error, data } = useGetLowStockProducts();
  console.log("Low Stock", data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error - {error?.message ?? "Oops"}</div>;
  if (data.rows.length === 0) return <div>No products in low stock</div>;

  // if (data.rows.length > 0)
  return <DataTable columns={lowStockColumns} data={data?.rows} />;
};

export default TableLowStock;
