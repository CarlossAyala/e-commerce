import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { RequestVerifyStatus } from "@/shared/components";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  RadioGroup,
  RadioGroupItem,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Spinner,
  Textarea,
} from "@/components";
import { Formatter } from "@/utils";
import { useUpdateRequestVerify } from "../queries";
import { requestVerifyInitial, requestVerifySchema } from "../schemas";

export const RequestsVerifyActions = ({ row }) => {
  const [viewSheet, setViewSheet] = useState(false);
  const [dialog, setDialog] = useState(false);

  const form = useForm({
    resolver: yupResolver(requestVerifySchema),
    defaultValues: requestVerifyInitial,
    mode: "onSubmit",
  });

  const request = row.original;
  const updateRequest = useUpdateRequestVerify(request.id);

  const handleRespondRequest = (values) => {
    updateRequest.mutate(values, {
      onSuccess() {
        toast("Request verify updated successfully");
        setDialog(false);
      },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <EllipsisHorizontalIcon className="size-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onSelect={() => setViewSheet(true)}>
            View
          </DropdownMenuItem>
          {request.status === "queue" && (
            <DropdownMenuItem onSelect={() => setDialog(true)}>
              Respond
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={viewSheet} onOpenChange={setViewSheet}>
        <SheetContent className="space-y-3">
          <SheetHeader>
            <SheetTitle>View request verify</SheetTitle>
            <SheetDescription>About this request</SheetDescription>
          </SheetHeader>

          <section>
            <h4 className="text-sm font-medium">Status</h4>
            <RequestVerifyStatus status={request.status} />
          </section>
          <section className="text-sm">
            <h4 className="font-medium">Description</h4>
            <p className="text-muted-foreground">{request.description}</p>
          </section>
          <section className="text-sm">
            <h4 className="font-medium">Created At</h4>
            <p className="text-muted-foreground">
              {Formatter.fullDate(request.createdAt)}
            </p>
          </section>

          {request.status !== "queue" && (
            <>
              <h3 className="font-semibold">Administration</h3>

              <section className="text-sm">
                <h4 className="font-medium">Response</h4>
                <p className="text-muted-foreground">{request.response}</p>
              </section>
              <section className="text-sm">
                <h4 className="font-medium">Created At</h4>
                <p className="text-muted-foreground">
                  {Formatter.fullDate(request.updatedAt)}
                </p>
              </section>
            </>
          )}

          <SheetFooter>
            <SheetClose asChild>
              <Button type="button">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent className="sm:max-w-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleRespondRequest)}
              className="space-y-4"
            >
              <DialogHeader>
                <DialogTitle>Request Verify</DialogTitle>
                <DialogDescription>
                  Approve or reject request for verification.
                </DialogDescription>
              </DialogHeader>

              <FormField
                control={form.control}
                name="response"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Response</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Response" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Action</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="approved" />
                          </FormControl>
                          <FormLabel className="font-normal">Approve</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="rejected" />
                          </FormControl>
                          <FormLabel className="font-normal">Reject</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" disabled={updateRequest.isLoading}>
                  {updateRequest.isLoading && (
                    <Spinner className="mr-2 size-4" />
                  )}
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
