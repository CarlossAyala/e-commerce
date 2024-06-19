import { Link } from "react-router-dom";
import placeholderImage from "@/assets/images/placeholder-image.jpg";
import { storeActionRoutes, useGetStores } from "../features/stores";

export const SearchStores = ({ search, cleanUp }) => {
  const params = new URLSearchParams({
    q: search,
  }).toString();
  const { data: stores, isLoading, isError, error } = useGetStores(params);

  const sliced = stores?.rows.slice(0, 5);
  const hasMore = stores?.rows.length > 5;

  return (
    <div className="px-2 pb-2">
      <p className="px-2 py-2 text-xs leading-tight text-muted-foreground">
        Stores
      </p>
      <ol className="text-sm leading-tight text-accent-foreground">
        {isLoading ? (
          <li className="px-2">Loading...</li>
        ) : isError ? (
          <li className="px-2">{error.message}</li>
        ) : !stores.rows.length ? (
          <li className="px-2">No results found</li>
        ) : (
          <>
            {sliced.map((store) => (
              <li key={store.id}>
                <Link
                  onClick={cleanUp}
                  to={storeActionRoutes.details(store)}
                  className="relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-2">
                    <div className="size-8 overflow-hidden rounded-full">
                      <img
                        className="size-full object-contain"
                        src={store.url ?? placeholderImage}
                        alt={store.name}
                      />
                    </div>
                    <div>
                      <p>{store.name}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}

            {hasMore && search && (
              <li className="mt-1 text-center text-xs text-blue-600">
                <Link onClick={cleanUp} to={storeActionRoutes.root(params)}>
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
