import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/features/auth";
import { Spinner } from "@/shared/components";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from "@/shared/components";
import {
  questionDefault,
  questionSchema,
  useCreateQuestion,
} from "../../questions";

export const QANew = ({ productId }) => {
  const [dialog, setDialog] = useState(false);
  const { data } = useAuth();
  const isAuthenticated = !!data;

  const { mutate, isLoading } = useCreateQuestion();

  const form = useForm({
    resolver: yupResolver(questionSchema),
    defaultValues: questionDefault,
    mode: "onSubmit",
  });

  const handleCreate = (values) => {
    mutate(
      { productId, values },
      {
        onSuccess() {
          setDialog(false);
          form.reset();
        },
      },
    );
  };

  return (
    <>
      <Button
        type="button"
        disabled={!isAuthenticated}
        onClick={() => setDialog(true)}
      >
        Ask
      </Button>

      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreate)}
              className="space-y-4 sm:max-w-md"
            >
              <DialogHeader>
                <DialogTitle>New Question</DialogTitle>
                <DialogDescription>
                  Ask a question about this product.
                </DialogDescription>
              </DialogHeader>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your question here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading && <Spinner className="mr-2 size-5" />}
                Ask
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
