import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  Pagination,
  TableRow,
  TableSkeleton,
  Textarea,
} from "@/components";
import { Formatter } from "@/utils";
import { productActionRoutes, useGetProduct } from "../../product";
import { replyInitial, replySchema } from "../schemas";
import {
  useGetQAsByProductId,
  useGetQuestion,
  useRejectQuestion,
  useReplyQuestion,
} from "../queries";

export const QuestionProduct = () => {
  const [params] = useSearchParams();
  const { productId } = useParams();

  const [questionId, setQuestionId] = useState(null);
  const [dialogReply, setDialogReply] = useState(false);
  const [dialogReject, setDialogReject] = useState(false);
  const product = useGetProduct(productId);

  const questions = useGetQAsByProductId(productId, params.toString());
  const question = useGetQuestion(questionId);
  const reply = useReplyQuestion();
  const reject = useRejectQuestion();

  const form = useForm({
    resolver: yupResolver(replySchema),
    defaultValues: replyInitial,
    mode: "all",
  });

  const handleOpenDialogReply = (id) => {
    setQuestionId(id);
    setDialogReply(true);
  };
  const handleCloseDialogReply = () => {
    setDialogReply(false);
    setQuestionId(null);
  };
  const handleOpenDialogReject = (id) => {
    setQuestionId(id);
    setDialogReject(true);
  };
  const handleCloseDialogReject = () => {
    setDialogReject(false);
    setQuestionId(null);
  };

  const handleReply = (values) => {
    reply.mutate([questionId, values], {
      onSuccess() {
        handleCloseDialogReply();
        toast("Reply successfully");
        form.reset();
      },
    });
  };

  const handleReject = () => {
    reject.mutate(questionId, {
      onSuccess() {
        handleCloseDialogReject();
        toast("Question rejected");
      },
    });
  };

  const isEmpty = questions.isSuccess && questions.data?.rows.length === 0;
  const hasContent = questions.isSuccess && questions.data?.rows.length > 0;

  console.log("form", form);

  return (
    <main className="container flex-1">
      <section className="mt-2">
        <h1 className="text-2xl font-bold tracking-tight">Questions Product</h1>
        <p className="text-muted-foreground">
          Here will appear all product questions.
        </p>
      </section>
      <section>
        <h2 className="mb-1 text-sm font-medium leading-tight text-gray-900">
          Product
        </h2>
        {product.isLoading && <p>Loading product...</p>}
        {product.isError && <p>Error loading product</p>}
        {product.isSuccess && (
          <Card>
            <CardHeader>
              <CardTitle>
                <Link
                  className="line-clamp-1"
                  to={productActionRoutes.details(productId)}
                  target="_blank"
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
      <section className="space-y-4">
        {/* <Search /> */}

        {questions.isLoading && <TableSkeleton />}
        {isEmpty && <TableEmpty />}
        {hasContent && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.data.rows.map((_question) => (
                  <TableRow key={_question.id}>
                    <TableCell className="max-w-sm">
                      <p className="line-clamp-1 font-medium">
                        {_question.question}
                      </p>
                    </TableCell>
                    <TableCell className="text-center">
                      {Formatter.shortDate(_question.createdAt)}
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                          >
                            <EllipsisHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onSelect={() => handleOpenDialogReply(_question.id)}
                          >
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => handleOpenDialogReply(_question.id)}
                          >
                            Reply
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() =>
                              handleOpenDialogReject(_question.id)
                            }
                          >
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Sheet open={dialogReply} onOpenChange={setDialogReply}>
              <SheetContent className="space-y-4">
                <SheetHeader>
                  <SheetTitle>Reply question</SheetTitle>
                  <SheetDescription>
                    This reply will be visible to the customer in your product
                    page.
                  </SheetDescription>
                </SheetHeader>
                {question.isLoading && <p>Loading question...</p>}
                {question.isError && <p>Error loading question</p>}
                {question.isSuccess && (
                  <>
                    <Card>
                      <CardHeader>
                        <p className="text-sm text-muted-foreground">
                          Question
                        </p>
                        <CardTitle className="text-sm">
                          {question.data.question}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <CardDescription className="text-black">
                          {Formatter.shortDate(question.data.createdAt)}
                        </CardDescription>
                      </CardHeader>
                    </Card>

                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handleReply)}
                        className="space-y-4"
                      >
                        <FormField
                          control={form.control}
                          name="answer"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Reply</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Reply" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <SheetFooter>
                          <Button type="submit">Save</Button>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => {
                              handleCloseDialogReply();
                              handleOpenDialogReject(question.data.id);
                            }}
                          >
                            Reject
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={handleCloseDialogReply}
                          >
                            Cancel
                          </Button>
                        </SheetFooter>
                      </form>
                    </Form>
                  </>
                )}
              </SheetContent>
            </Sheet>

            <AlertDialog open={dialogReject} onOpenChange={setDialogReject}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reject question</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete the question permanently. This action
                    cannot be undone
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Card>
                  {question.isLoading && <p>Loading question...</p>}
                  {question.isError && <p>Error loading question</p>}
                  {question.isSuccess && (
                    <CardHeader>
                      <p className="text-sm text-muted-foreground">Question</p>
                      <CardTitle className="text-sm">
                        {question.data.question}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <CardDescription className="text-black">
                        {Formatter.shortDate(question.data.createdAt)}
                      </CardDescription>
                    </CardHeader>
                  )}
                </Card>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button variant="destructive" onClick={handleReject}>
                    Reject
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}

        <Pagination totalRows={questions.data?.count} />
      </section>
    </main>
  );
};
