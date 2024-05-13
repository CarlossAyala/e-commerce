import { useSearchParams } from "react-router-dom";
import {
  DataTable,
  DataTableContent,
  DataTableSkeleton,
  EmptyState,
  PageHeader,
  PageHeaderHeading,
  URLPagination,
} from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import { Filters } from "@/components";
import { productListColumns } from "../components/columns";
import { useGetProducts } from "../queries";

const filters = [
  {
    filter_type: "search",
  },
];

export const List = () => {
  const [params] = useSearchParams();
  const { data, isLoading, isError, error } = useGetProducts(params.toString());
  useDocumentTitle("Product List");

  return (
    <main className="flex-1 space-y-4 px-4 pb-10 tablet:px-6">
      <PageHeader>
        <PageHeaderHeading>Product List</PageHeaderHeading>
      </PageHeader>

      <Filters filters={filters} />

      {isLoading ? (
        <DataTableSkeleton />
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : !data.rows.length ? (
        <DataTableContent columns={productListColumns}>
          <EmptyState
            title="No Products"
            description="No products found"
            className="border-none"
          />
        </DataTableContent>
      ) : (
        <DataTable columns={productListColumns} data={data.rows} />
      )}

      <URLPagination count={data?.count} />
    </main>
  );
};
