import { DataTable } from "../../../../components";
import { reviewTimelineColumns } from "../columns";
import { useGetReviewTimeline } from "../queries";

const TableReviewTimeline = () => {
  const { isLoading, isError, error, data } = useGetReviewTimeline();
  console.log("Review Timeline", data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error - {error?.message ?? "Oops"}</div>;
  if (data.rows.length === 0) return <div>No reviews founded</div>;

  // if (data.rows.length > 0)
  return <DataTable columns={reviewTimelineColumns} data={data?.rows} />;
};

export default TableReviewTimeline;
