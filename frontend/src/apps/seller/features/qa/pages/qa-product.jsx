import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  DataTable,
  DataTableContent,
  DataTableSkeleton,
  EmptyState,
  PageHeader,
  PageHeaderHeading,
  Pagination,
} from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Filters,
  Skeleton,
} from "@/components";
import { productActionRoutes, useGetProduct } from "../../products";
import { qaProductColumns } from "../components/columns";
import { QUESTION_STATUS } from "../utils";
import { useGetQAByProductId } from "../queries";

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

export const QAProduct = () => {
  const [params] = useSearchParams();
  const { productId } = useParams();

  const product = useGetProduct(productId);
  useDocumentTitle(
    product.data?.name ? `${product.data?.name} - "QA Product"` : "QA Product",
  );

  const { data, isLoading, isError, error } = useGetQAByProductId(
    productId,
    params.toString(),
  );

  return (
    <main className="flex-1 space-y-4 px-6">
      <PageHeader>
        <PageHeaderHeading>QA Product</PageHeaderHeading>
      </PageHeader>

      <section className="space-y-2">
        <h3 className="text-sm font-medium leading-tight text-gray-900">
          Product
        </h3>

        {product.isLoading ? (
          <Card>
            <CardHeader className="space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
          </Card>
        ) : product.isError ? (
          <EmptyState title="Error" description={product.error.message} />
        ) : (
          <Link to={productActionRoutes.details(productId)} className="block">
            <Card>
              <CardHeader>
                <CardTitle className="line-clamp-1">
                  {product.data.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {product.data.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )}
      </section>

      <Filters filters={filters} />

      {isLoading ? (
        <DataTableSkeleton />
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : !data.rows.length ? (
        <DataTableContent columns={qaProductColumns}>
          <EmptyState
            title="No QA"
            description="Your are up to date!"
            className="border-none"
          />
        </DataTableContent>
      ) : (
        <DataTable columns={qaProductColumns} data={data.rows} />
      )}

      <Pagination count={data?.count} />
    </main>
  );
};
