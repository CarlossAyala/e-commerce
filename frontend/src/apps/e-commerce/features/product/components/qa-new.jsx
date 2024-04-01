import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useAuth } from "@/shared/auth";
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
  Spinner,
  Textarea,
} from "@/components";
import { questionDefault, questionSchema, useCreateQuestion } from "../../qa";

export const QANew = ({ productId }) => {
  const [dialog, setDialog] = useState(false);
  const { isAuthenticated } = useAuth();

  const { mutate, isLoading } = useCreateQuestion();

  const form = useForm({
    resolver: yupResolver(questionSchema),
    defaultValues: questionDefault,
    mode: "all",
  });

  const handleCreate = (values) => {
    mutate(
      { productId, values },
      {
        onSuccess() {
          toast("Question created");
          setDialog(false);
          form.reset();
        },
      },
    );
  };

  const handleOpen = () => {
    if (!isAuthenticated) {
      alert("You need to be logged in to ask about this product.");
      return;
    } else {
      setDialog(true);
    }
  };

  return (
    <>
      <Button type="button" onClick={handleOpen}>
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
