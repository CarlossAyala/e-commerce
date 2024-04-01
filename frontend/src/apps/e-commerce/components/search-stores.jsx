import { Link } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { storeActionRoutes, useGetStores } from "../features/store";

export const SearchStores = ({ search, cleanUp }) => {
  const params = new URLSearchParams({
    q: search,
  }).toString();
  const { stores, isLoading, isError, isEmpty, error } = useGetStores(params);

  const sliced = stores?.slice(0, 5);
  const hasMore = stores?.length > 5;

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
        ) : isEmpty ? (
          <li className="px-2">No results found</li>
        ) : (
          <>
            {sliced.map((store) => (
              <li key={store.id}>
                <Link
                  onClick={cleanUp}
                  to={storeActionRoutes.details(store.slug)}
                  className="relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-2">
                    <div className="size-8 overflow-hidden rounded-full border border-gray-200">
                      <img
                        className="size-full object-contain"
                        src="https://http2.mlstatic.com/storage/official-stores-images/xiaomi/logo20230203114458.jpg"
                        alt="Alt"
                      />
                    </div>
                    <div className="flex gap-1">
                      <p>{store.name}</p>
                      {store.official && (
                        <CheckBadgeIcon
                          title="Official Store"
                          className="h-4 w-4 text-accent-foreground"
                        />
                      )}
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
