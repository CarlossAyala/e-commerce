import { useParams } from "react-router-dom";
import { EmptyState } from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import { Badge, Skeleton } from "@/components";
import { useGetCategory } from "../queries";

export const CategoryProfile = () => {
  const { slug } = useParams();
  const { data: category, isLoading, isError, error } = useGetCategory(slug);

  useDocumentTitle(
    isLoading ? "Loading..." : isError ? "Error - Category" : category.name,
  );

  return (
    <>
      {isLoading ? (
        <CategoryProfile.Skeleton />
      ) : isError ? (
        <EmptyState
          title="Error"
          description={error.message}
          className="mt-4"
        />
      ) : (
        <section className="space-y-4">
          <div className="-mx-4 h-56 md:mx-0">
            <img
              className="size-full object-cover"
              src="https://http2.mlstatic.com/storage/official-stores-images/audibuenosaires/background20210112201824.jpg"
              alt={`${category.name} category banner`}
            />
          </div>
          <div className="space-y-1">
            <Badge className="uppercase">{category.type}</Badge>
            <h2 className="text-2xl font-bold">{category.name}</h2>
            <p className="leading-tight text-muted-foreground">
              {category.description}
            </p>
          </div>
        </section>
      )}
    </>
  );
};

CategoryProfile.Skeleton = function CategoryProfileSkeleton() {
  return (
    <section className="space-y-4">
      <Skeleton className="-mx-4 h-56 md:mx-0" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-14" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </section>
  );
};
