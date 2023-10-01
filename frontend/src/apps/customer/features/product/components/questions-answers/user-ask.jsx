import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  questionDefault,
  questionSchema,
  useCreateQuestion,
} from "../../../question";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
  useToast,
} from "../../../../../../components";

export const UserAsk = ({ productId }) => {
  const { toast } = useToast();
  const create = useCreateQuestion();

  const form = useForm({
    resolver: yupResolver(questionSchema),
    defaultValues: questionDefault,
    mode: "all",
  });

  const onSubmit = (values) => {
    create.mutate([productId, values], {
      onSuccess() {
        toast({
          description: "Question created",
        });
        create.reset();
        form.reset();
      },
      onError(error) {
        toast({
          variant: "destructive",
          title: "Question could not be created",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl space-y-4"
      >
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
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
        <Button type="submit" disabled={create.isLoading}>
          Ask
        </Button>
      </form>
    </Form>
  );
};
