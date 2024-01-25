import { useNavigate } from "react-router-dom";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import {
  ArrowPathIcon,
  StarIcon as StarOutline,
} from "@heroicons/react/24/outline";
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
  useToast,
} from "../../../../../components";
import { useCreateReview } from "../queries";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reviewDefault, reviewSchema } from "../schemas";
import { reviewActionRoutes } from "../utils";
import { cn } from "../../../../../libs/utils";

const STARS = [1, 2, 3, 4, 5];
const RATINGS = ["Poor", "Fair", "Average", "Good", "Excellent"];

export const ReviewProductForm = ({ review, reviewId }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const createReview = useCreateReview(reviewId);

  const form = useForm({
    resolver: yupResolver(reviewSchema),
    defaultValues: reviewDefault,
    mode: "all",
  });

  const handleCreate = (values) => {
    createReview.mutate([review.productId, values], {
      onSuccess() {
        toast({
          description: "Review created successfully",
        });
        navigate(reviewActionRoutes.list("tab=done&page=1"));
      },
      onError(error) {
        toast({
          title: "Review could not be created",
          description: error.message,
        });
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
            <FormItem className="space-y-1">
              <FormLabel>Rating</FormLabel>
              <FormDescription>
                How would you rate this product?
              </FormDescription>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex justify-center gap-x-2"
              >
                {STARS.map((star) => (
                  <FormItem
                    key={star}
                    className="flex flex-col items-center justify-center "
                  >
                    <FormLabel className="mb-0 rounded-full p-2 hover:bg-neutral-100">
                      <FormControl>
                        <RadioGroupItem value={star} className="sr-only" />
                      </FormControl>
                      {field.value >= star ? (
                        <StarSolid className="size-10 text-indigo-500" />
                      ) : (
                        <StarOutline className="size-10 text-indigo-500" />
                      )}
                    </FormLabel>
                    <span
                      className={cn(
                        "text-sm",
                        star === field.value
                          ? "text-indigo-600"
                          : "text-muted-foreground",
                      )}
                    >
                      {RATINGS[star - 1]}
                    </span>
                  </FormItem>
                ))}
              </RadioGroup>
              <FormMessage />
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
          {createReview.isLoading && (
            <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Create
        </Button>
      </form>
    </Form>
  );
};
