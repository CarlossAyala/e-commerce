import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Spinner,
  Textarea,
} from "@/components";
import { Formatter } from "@/utils";
import { replyInitial, replySchema } from "../schemas";
import { useRejectQuestion, useReplyQuestion } from "../queries";
import { QAStatus } from "../../../../../shared/components/qa-status";

export const QAProductTableAction = ({ row }) => {
  const [viewSheet, setViewSheet] = useState(false);
  const [replaySheet, setReplaySheet] = useState(false);
  const [rejectSheet, setRejectSheet] = useState(false);

  const reject = useRejectQuestion();
  const reply = useReplyQuestion();

  const form = useForm({
    resolver: yupResolver(replySchema),
    values: replyInitial,
    mode: "all",
  });

  const qa = row.original;

  const handleReply = (values) => {
    reply.mutate(
      { questionId: qa.id, values },
      {
        onSuccess() {
          toast("Reply successfully");
          setReplaySheet(false);
        },
      },
    );
  };

  const handleReject = () => {
    reject.mutate(qa.id, {
      onSuccess() {
        toast("Reject successfully");
        setRejectSheet(false);
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
            <span className="sr-only">Open menu</span>
            <EllipsisHorizontalIcon className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onSelect={() => setViewSheet(true)}>
            View
          </DropdownMenuItem>
          {qa.status === "queue" && (
            <>
              <DropdownMenuItem onSelect={() => setReplaySheet(true)}>
                Reply
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setRejectSheet(true)}
                className="text-red-600 hover:text-red-600 focus:text-red-600"
              >
                Reject
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={viewSheet} onOpenChange={setViewSheet}>
        <SheetContent className="space-y-4 py-2">
          <SheetHeader className="space-y-2">
            <SheetTitle className="uppercase">Question</SheetTitle>

            <div>
              <h3 className="text-sm font-medium">Status</h3>
              <QAStatus status={qa.status} />
            </div>
            <div>
              <h3 className="text-sm font-medium">Content</h3>
              <p className="text-sm text-muted-foreground">{qa.content}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Created At</h3>
              <p className="text-sm text-muted-foreground">
                {Formatter.fullDate(qa.createdAt)}
              </p>
            </div>
          </SheetHeader>

          {qa.status !== "queue" && (
            <SheetHeader className="space-y-2">
              <SheetTitle className="uppercase">Answer</SheetTitle>

              {qa.status === "answered" ? (
                <>
                  <div>
                    <h3 className="text-sm font-medium">Content</h3>
                    <p className="text-sm text-muted-foreground">
                      {qa.answer.content}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Created At</h3>
                    <p className="text-sm text-muted-foreground">
                      {Formatter.fullDate(qa.answer.createdAt)}
                    </p>
                  </div>
                </>
              ) : (
                <div>
                  <h3 className="text-sm font-medium">Created At</h3>
                  <p className="text-sm text-muted-foreground">
                    {Formatter.fullDate(qa.updatedAt)}
                  </p>
                </div>
              )}
            </SheetHeader>
          )}

          <SheetFooter>
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={replaySheet} onOpenChange={setReplaySheet}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle className="uppercase">Reply Question</SheetTitle>
          </SheetHeader>

          <div>
            <h3 className="text-sm font-medium">Question</h3>
            <p className="text-sm text-muted-foreground">{qa.content}</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleReply)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Content" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter>
                <Button type="submit" disabled={reply.isLoading}>
                  {reply.isLoading && <Spinner className="mr-2 size-4" />}
                  Reply
                </Button>

                <SheetClose asChild>
                  <Button type="button" variant="outline">
                    Close
                  </Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>

      <AlertDialog open={rejectSheet} onOpenChange={setRejectSheet}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This question will no longer be
              accessible by users in QA sections.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              type="button"
              disabled={reject.isLoading}
              onClick={handleReject}
            >
              {reject.isLoading && <Spinner className="mr-2 size-4" />}
              Reject
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
