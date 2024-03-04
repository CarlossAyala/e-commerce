import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { cn } from "@/libs/utils";
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
  Spinner,
  Textarea,
} from "@/components";
import { reviewActionRoutes } from "../utils";
import { reviewDefault, reviewSchema } from "../schemas";
import { useCreateReview } from "../queries";

const STARS = [1, 2, 3, 4, 5];
const RATINGS = ["Poor", "Fair", "Average", "Good", "Excellent"];

export const ReviewProductForm = () => {
  const { orderItemId } = useParams();
  const navigate = useNavigate();

  const { mutate, isLoading } = useCreateReview(orderItemId);

  const form = useForm({
    resolver: yupResolver(reviewSchema),
    defaultValues: reviewDefault,
    mode: "all",
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
          {isLoading && <Spinner className="mr-2 size-4" />}
          Create
        </Button>
      </form>
    </Form>
  );
};
