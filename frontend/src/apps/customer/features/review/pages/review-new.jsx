import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowPathIcon,
  FaceFrownIcon,
  StarIcon as StarOutline,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { reviewDefault, reviewSchema } from "../schemas";
import {
  Button,
  EmptyPlaceholder,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  MainContent,
  RadioGroup,
  RadioGroupItem,
  Skeleton,
  Textarea,
  useToast,
} from "../../../../../components";
import { reviewActionRoutes } from "../utils";
import { useCreateReview, useGetReview } from "../queries";
import { ReviewProduct } from "../components/review-product";

const STARS = [1, 2, 3, 4, 5];
const RATINGS = ["Poor", "Fair", "Average", "Good", "Excellent"];

const ReviewNew = () => {
  const { toast } = useToast();
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const {
    data: review,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetReview(reviewId, "status=done");
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
        navigate(reviewActionRoutes.list);
      },
      onError(error) {
        toast({
          title: "Review could not be created",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };

  return (
    <MainContent className="max-w-3xl space-y-4">
      <section className="mt-2 space-y-0.5">
        <h2 className="tracking-none scroll-m-20 text-3xl font-bold">
          Create Review
        </h2>
        <p className="text-sm text-muted-foreground">
          Create a review for this product.
        </p>
      </section>

      <section className="space-y-4">
        {isLoading && (
          <>
            <div>
              <Skeleton className="mb-2 h-4 w-1/3" />
              <ReviewProduct.Skeleton className="rounded-md border border-black/10" />
            </div>

            <div>
              <Skeleton className="mb-2 h-4 w-1/3" />
              <Skeleton className="h-12 w-3/4" />
            </div>

            <div>
              <Skeleton className="mb-2 h-4 w-1/3" />
              <Skeleton className="h-16 w-full" />
            </div>

            <Skeleton className="h-9 w-20" />
          </>
        )}
        {isError && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
            <EmptyPlaceholder.Title>
              Error fetching review
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              {error.message}
            </EmptyPlaceholder.Description>
            <Button type="button" asChild>
              <Link to={reviewActionRoutes.list}>Go back</Link>
            </Button>
          </EmptyPlaceholder>
        )}
        {isSuccess && (
          <>
            <div className="space-y-1">
              <h3 className="text-sm font-medium leading-tight">Product</h3>
              <ReviewProduct
                className="rounded-md border border-black/10"
                product={review.product}
              />
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCreate)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormDescription>
                        How would you rate this product?
                      </FormDescription>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="mt-2 flex gap-x-2"
                      >
                        {STARS.map((star) => (
                          <FormItem
                            key={star}
                            className="flex flex-col items-center justify-center "
                          >
                            <FormLabel className="mb-0 rounded-full p-2 hover:bg-black/10">
                              <FormControl>
                                <RadioGroupItem
                                  value={star}
                                  className="sr-only"
                                />
                              </FormControl>
                              {field.value >= star ? (
                                <StarSolid className="h-10 w-10 text-indigo-500" />
                              ) : (
                                <StarOutline className="h-10 w-10 text-indigo-500" />
                              )}
                            </FormLabel>
                            <span className="text-sm font-normal text-muted-foreground">
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
          </>
        )}
      </section>
    </MainContent>
  );
};

export default ReviewNew;
