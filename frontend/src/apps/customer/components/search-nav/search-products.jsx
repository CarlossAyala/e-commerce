import { Link } from "react-router-dom";
import { productActionRoutes } from "../../features/product";
import { Formatter } from "@/utils";
import { useGetProducts } from "@/shared/features/product";

export const SearchProducts = ({ search, cleanUp }) => {
  const params = new URLSearchParams({ q: search }).toString();

  const { data: products, isLoading, isError, error } = useGetProducts(params);
  const sliced = products?.rows.slice(0, 5);
  const hasMore = products?.rows.length > 5;

  const isEmpty = products?.rows.length === 0;

  return (
    <div className="px-2 pb-2">
      <p className="px-2 py-1.5 text-xs leading-tight text-muted-foreground">
        Products
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
            {sliced.map((product) => (
              <li key={product.id}>
                <Link
                  onClick={cleanUp}
                  to={productActionRoutes.details(product)}
                  className="relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-2">
                    <div className="size-9 shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        className="size-full object-contain"
                        src="https://http2.mlstatic.com/D_Q_NP_2X_959277-MLU72641778671_112023-T.webp"
                        alt="Alt"
                      />
                    </div>
                    <div>
                      <p className="line-clamp-1">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {Formatter.currency(product.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}

            {hasMore && search && (
              <li className="mt-1 text-center text-xs text-blue-600">
                <Link onClick={cleanUp} to={productActionRoutes.root(params)}>
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
