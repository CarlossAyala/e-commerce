import { DataTable } from "../../../../components";
import { productsColumns } from "../columns";
import { useGetProducts } from "../queries";

const TableProducts = () => {
  const { isLoading, isError, error, data } = useGetProducts();
  console.log("Products", data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error - {error?.message ?? "Oops"}</div>;
  if (data.rows.length === 0) return <div>No products founded</div>;

  // if (data.rows.length > 0)
  return <DataTable columns={productsColumns} data={data?.rows} />;
};

export default TableProducts;
