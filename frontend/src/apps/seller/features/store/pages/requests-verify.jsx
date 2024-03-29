import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { DataTable, DataTableSkeleton, Pagination } from "@/shared/components";
import {
  Button,
  EmptyPlaceholder,
  Filters,
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
  Spinner,
  Textarea,
} from "@/components";
import { requestsVerifyColumns } from "../components/columns";
import { requestVerifyInitial, requestVerifySchema } from "../schemas";
import {
  useCreateRequestVerify,
  useGetRequestsVerify,
  useGetStore,
} from "../queries";

const filters = [
  {
    filter_type: "search",
  },
  {
    filter_type: "group",
    headline: "Status",
    groups: [
      {
        filter_type: "checkbox",
        name: "status",
        items: [
          {
            label: "Queue",
            value: "queue",
          },
          {
            label: "Approved",
            value: "approved",
          },
          {
            label: "Rejected",
            value: "rejected",
          },
        ],
      },
    ],
  },
];

export const RequestsVerify = () => {
  const [sheet, setSheet] = useState(false);
  const [params] = useSearchParams();
  const store = useGetStore();
  const {
    data: requests,
    isLoading,
    isError,
    error,
  } = useGetRequestsVerify(params.toString());
  const createRequestVerify = useCreateRequestVerify();

  const form = useForm({
    resolver: yupResolver(requestVerifySchema),
    defaultValues: requestVerifyInitial,
    mode: "onSubmit",
  });

  const handleNewRequest = (values) => {
    createRequestVerify.mutate(values, {
      onSuccess() {
        toast("Request verify created successfully");
        setSheet(false);
      },
    });
  };

  const handleCloseNewRequest = () => {
    setSheet(false);
    form.reset();
  };

  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <section className="flex items-center justify-between gap-2">
        <h2 className="text-2xl font-bold uppercase tracking-tight">
          Requests Verify
        </h2>
        {!store.data.official && (
          <Button type="button" onClick={() => setSheet(true)}>
            New Request
          </Button>
        )}
      </section>

      <Sheet open={sheet} onOpenChange={setSheet}>
        <SheetContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleNewRequest)}
              className="space-y-4"
            >
              <SheetHeader>
                <SheetTitle>New request verify</SheetTitle>
                <SheetDescription>
                  Send a request to verify your store!
                </SheetDescription>
              </SheetHeader>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="About your request verify..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter>
                <Button type="submit" disabled={createRequestVerify.isLoading}>
                  {createRequestVerify.isLoading && (
                    <Spinner className="mr-2 size-4" />
                  )}
                  Create
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseNewRequest}
                >
                  Cancel
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>

      <Filters filters={filters} />

      {isLoading ? (
        <DataTableSkeleton />
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : !requests.rows.length ? (
        <EmptyPlaceholder
          title="No requests"
          description="No requests found."
        />
      ) : (
        <DataTable data={requests.rows} columns={requestsVerifyColumns} />
      )}

      <Pagination count={requests?.count} />
    </main>
  );
};
