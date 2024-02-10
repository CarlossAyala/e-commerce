import { useParams } from "react-router-dom";
import { Badge, EmptyPlaceholder, Skeleton } from "../../../../../components";
import { useGetCategory } from "../queries";
import { useDocumentTitle } from "../../../../../hooks";

export const CategoryProfile = () => {
  const { slug } = useParams();
  const {
    data: category,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategory(slug);

  useDocumentTitle(isSuccess ? category.name : "Category");

  return (
    <section className="space-y-2">
      {isLoading ? (
        <CategoryProfile.Skeleton />
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : (
        <>
          <img
            className="h-56 w-full object-cover"
            src="https://http2.mlstatic.com/storage/official-stores-images/audibuenosaires/background20210112201824.jpg"
            alt={`${category.name} category banner`}
          />
          <div className="space-y-1 px-4 lg:px-0">
            <Badge variant="outline" className="uppercase">
              {category.type}
            </Badge>
            <h2 className="text-2xl font-bold">{category.name}</h2>
            <p className="leading-tight text-muted-foreground">
              {category.description}
            </p>
          </div>
        </>
      )}
    </section>
  );
};

CategoryProfile.Skeleton = function CategoryProfileSkeleton() {
  return (
    <section className="space-y-4">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="space-y-2 px-4 lg:px-0">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </section>
  );
};
