import { DataTable } from "../../../../components";
import { allQuestionColumns } from "../columns";
import { useGetQAs } from "../queries";

const TableAllQuestion = () => {
  const { isLoading, isError, error, data } = useGetQAs();
  console.log("QAs", data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error - {error?.message ?? "Oops"}</div>;
  if (data.rows.length === 0) return <div>No QAs</div>;

  // if (data.rows.length > 0)
  return <DataTable columns={allQuestionColumns} data={data?.rows} />;
};

export default TableAllQuestion;
