import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { StarIcon } from "@heroicons/react/24/solid";
import { Spinner } from "@/shared/components";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
  Textarea,
} from "@/components";
import { cn } from "@/libs";
import { reviewActionRoutes } from "../utils";
import { reviewDefault, reviewSchema } from "../schemas";
import { useCreateReview } from "../queries";

const RATINGS = ["Poor", "Fair", "Average", "Good", "Excellent"];

export const ReviewProductForm = () => {
  const { orderItemId } = useParams();
  const navigate = useNavigate();

  const { mutate, isLoading } = useCreateReview(orderItemId);

  const form = useForm({
    resolver: yupResolver(reviewSchema),
    defaultValues: reviewDefault,
    mode: "onSubmit",
  });

  const handleCreate = (values) => {
    mutate(values, {
      onSuccess() {
        toast("Review created successfully");
        navigate(reviewActionRoutes.list);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Rating</FormLabel>
              <FormDescription>
                How would you rate this product?
              </FormDescription>

              <FormMessage />

              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex justify-center gap-2"
              >
                {new Array(5).fill(0).map((_, index) => (
                  <FormItem key={index}>
                    <FormControl>
                      <RadioGroupItem className="sr-only" value={index + 1} />
                    </FormControl>
                    <FormLabel className="flex flex-col items-center justify-center">
                      <StarIcon
                        className={cn(
                          "size-10",
                          field.value >= index + 1
                            ? "text-yellow-400"
                            : "text-gray-300",
                        )}
                      />
                      <p
                        className={cn(
                          "text-center text-sm font-normal",
                          field.value === index + 1
                            ? "text-primary"
                            : "text-muted-foreground",
                        )}
                      >
                        {RATINGS[index]}
                      </p>
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your experience"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {isLoading && <Spinner className="mr-2 size-4" />}
          Create
        </Button>
      </form>
    </Form>
  );
};
