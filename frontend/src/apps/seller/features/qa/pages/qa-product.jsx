import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Filters,
  Skeleton,
  EmptyPlaceholder,
} from "@/components";
import { productActionRoutes, useGetProduct } from "../../product";
import { QUESTION_STATUS } from "../utils";
import { QAProductTable } from "../components/qa-product-table";

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
  const { productId } = useParams();

  const product = useGetProduct(productId);

  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
        Questions & Answers Product
      </h2>

      <section className="space-y-2">
        <h2 className="text-sm font-medium leading-tight text-gray-900">
          Product
        </h2>

        {product.isLoading ? (
          <Card>
            <CardHeader className="space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
          </Card>
        ) : product.isError ? (
          <EmptyPlaceholder title="Error" description={product.error.message} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>
                <Link
                  className="truncate"
                  to={productActionRoutes.details(productId)}
                >
                  {product.data.name}
                </Link>
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {product.data.description}
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </section>

      <Filters filters={filters} />

      <QAProductTable />
    </main>
  );
};
