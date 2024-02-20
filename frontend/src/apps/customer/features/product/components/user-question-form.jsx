import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  questionDefault,
  questionSchema,
  useCreateQuestion,
} from "../../question";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from "../../../../../components";

export const UserQuestionForm = ({ productId }) => {
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
          description: error.message,
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
        <Button type="submit" disabled={create.isLoading}>
          Ask
        </Button>
      </form>
    </Form>
  );
};
