import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { QAStatus, Spinner } from "@/shared/components";
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
  Textarea,
} from "@/components";
import { Formatter } from "@/utils";
import { replyInitial, replySchema } from "../schemas";
import { useRejectQuestion, useReplyQuestion } from "../queries";

export const QAProductAction = ({ qa }) => {
  const [viewSheet, setViewSheet] = useState(false);
  const [replaySheet, setReplaySheet] = useState(false);
  const [rejectSheet, setRejectSheet] = useState(false);

  const reject = useRejectQuestion();
  const reply = useReplyQuestion();

  const form = useForm({
    resolver: yupResolver(replySchema),
    values: replyInitial,
    mode: "onSubmit",
  });

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
            size="icon"
            className="data-[state=open]:bg-muted"
          >
            <span className="sr-only">Open menu</span>
            <EllipsisHorizontalIcon className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onSelect={() => setViewSheet(true)}>
            View
          </DropdownMenuItem>
          {qa.status === "pending" && (
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
        <SheetContent className="space-y-4">
          <SheetHeader className="space-y-2">
            <SheetTitle className="uppercase">Question</SheetTitle>

            <div className="text-sm">
              <h3 className="font-medium">Status</h3>
              <QAStatus status={qa.status} />
            </div>
            <div className="text-sm">
              <h3 className="font-medium">Content</h3>
              <p className="text-muted-foreground">{qa.content}</p>
            </div>
            <div className="text-sm">
              <h3 className="font-medium">Created At</h3>
              <p className="text-muted-foreground">
                {Formatter.fullDate(qa.createdAt)}
              </p>
            </div>
          </SheetHeader>

          {qa.status !== "pending" && (
            <SheetHeader className="space-y-2">
              <SheetTitle className="uppercase">Answer</SheetTitle>

              {qa.status === "answered" ? (
                <>
                  <div className="text-sm">
                    <h3 className="font-medium">Content</h3>
                    <p className="text-muted-foreground">{qa.answer}</p>
                  </div>
                  <div className="text-sm">
                    <h3 className="font-medium">Created At</h3>
                    <p className="text-muted-foreground">
                      {Formatter.fullDate(qa.updatedAt)}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-sm">
                  <h3 className="font-medium">Created At</h3>
                  <p className="text-muted-foreground">
                    {Formatter.fullDate(qa.updatedAt)}
                  </p>
                </div>
              )}
            </SheetHeader>
          )}

          <SheetFooter>
            <SheetClose asChild>
              <Button type="button">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={replaySheet} onOpenChange={setReplaySheet}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle className="uppercase">Reply Question</SheetTitle>
          </SheetHeader>

          <div className="text-sm">
            <h3 className="font-medium">Question</h3>
            <p className="text-muted-foreground">{qa.content}</p>
          </div>

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
