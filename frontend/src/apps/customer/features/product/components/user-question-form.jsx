import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from "@/components";
import {
  questionDefault,
  questionSchema,
  useCreateQuestion,
} from "../../question";

export const UserQuestionForm = ({ productId }) => {
  const { mutate, isLoading } = useCreateQuestion();

  const form = useForm({
    resolver: yupResolver(questionSchema),
    defaultValues: questionDefault,
    mode: "all",
  });

  const handleCreate = (values) => {
    mutate([productId, values], {
      onSuccess() {
        toast("Question created");
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-2">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
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
          Ask
        </Button>
      </form>
    </Form>
  );
};
