import { Link, useSearchParams } from "react-router-dom";
import { useGetQuestions } from "../queries";
import { useDebounced } from "../../../../hooks";
import {
  Search,
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
  TableSkeleton,
} from "../../../../components";
import { productActionRoutes } from "../../product/utils";
import { questionActionRoutes } from "../utils";

const QuestionOverview = () => {
  const [params] = useSearchParams();
  const debounceParams = useDebounced(params.toString());

  const questions = useGetQuestions(debounceParams);

  const isEmpty = questions.isSuccess && questions.data?.rows.length === 0;
  const hasContent = questions.isSuccess && questions.data?.rows.length > 0;

  return (
    <main className="flex w-full flex-col space-y-4 overflow-auto px-4 pb-20">
      <section className="mt-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Questions Overview
        </h1>
        <p className="text-muted-foreground">
          Here are the numbers of questions about each product.
        </p>
      </section>

      <section className="space-y-4">
        <Search />

        {questions.isLoading && <TableSkeleton />}
        {isEmpty && <TableEmpty />}
        {hasContent && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-center">Questions</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.data.rows.map((question) => (
                  <TableRow key={question.product.id}>
                    <TableCell>
                      <Link
                        className="line-clamp-1"
                        to={productActionRoutes.details(question.product.id)}
                      >
                        {question.product.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      {question.count}
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <Link
                        to={questionActionRoutes.product(question.product.id)}
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}

        <TablePagination totalRows={questions.data?.count} />
      </section>
    </main>
  );
};

export default QuestionOverview;
