import { Link } from "react-router-dom";
import { useGetAllCategories } from "../../../common/category";
import { categoryActionRoutes } from "../../features/category";

export const SearchCategories = ({ search, cleanUp }) => {
  const { categories, isLoading, isError, error } = useGetAllCategories();
  const filtered = categories?.filter((category) => {
    return category.name.toLowerCase().includes(search.toLowerCase());
  });

  const sliced = filtered?.slice(0, 5);
  const hasResults = sliced?.length > 0;
  const hasMore = filtered?.length > 5;
  const params = new URLSearchParams({ q: search }).toString();

  return (
    <div className="px-2 pb-2">
      <p className="px-2 py-1.5 text-xs leading-tight text-muted-foreground">
        Categories
      </p>
      <ol className="text-sm leading-tight text-accent-foreground">
        {isLoading ? (
          <li className="px-2">Loading...</li>
        ) : isError ? (
          <li className="px-2">{error.message}</li>
        ) : !hasResults ? (
          <li className="px-2">No results found</li>
        ) : (
          <>
            {sliced.map((category) => (
              <li key={category.id}>
                <Link
                  className="relative line-clamp-2 flex cursor-default select-none items-center rounded-md p-2 text-accent-foreground hover:bg-accent"
                  onClick={cleanUp}
                  to={categoryActionRoutes.details(category.slug)}
                >
                  <p>{category.name}</p>
                </Link>
              </li>
            ))}

            {hasMore && search && (
              <li className="mt-1 text-center text-xs text-blue-600">
                <Link onClick={cleanUp} to={categoryActionRoutes.root(params)}>
                  Show more
                </Link>
              </li>
            )}
          </>
        )}
      </ol>
    </div>
  );
};
