import { useSearchParams } from "react-router-dom";
import {
  DataTable,
  DataTableContent,
  DataTableSkeleton,
  EmptyState,
  PageHeader,
  PageHeaderHeading,
  URLPagination,
  Filters,
} from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import { qaOverviewColumns } from "../components/columns";
import { QUESTION_STATUS } from "../utils";
import { useGetQA } from "../queries";

const filters = [
  {
    filter_type: "search",
  },
  {
    filter_type: "full-checkbox",
    name: "status",
    headline: "Status",
    items: Object.values(QUESTION_STATUS).map(({ value, label }) => ({
      value,
      label,
    })),
  },
];

export const Overview = () => {
  useDocumentTitle("Questions");
  const [params] = useSearchParams();
  const { data, isLoading, isError, error } = useGetQA(params.toString());

  return (
    <main className="flex-1 space-y-4 px-4 tablet:px-6">
      <PageHeader>
        <PageHeaderHeading>Questions</PageHeaderHeading>
      </PageHeader>

      <Filters filters={filters} />

      {isLoading ? (
        <DataTableSkeleton />
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : !data.rows.length ? (
        <DataTableContent columns={qaOverviewColumns}>
          <EmptyState
            title="No QA"
            description="Your are up to date!"
            className="border-none"
          />
        </DataTableContent>
      ) : (
        <DataTable columns={qaOverviewColumns} data={data.rows} />
      )}

      <URLPagination count={data?.count} />
    </main>
  );
};
