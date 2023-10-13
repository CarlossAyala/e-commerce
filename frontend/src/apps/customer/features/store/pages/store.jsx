import {
  EmptyPlaceholder,
  Input,
  SkeletonInput,
  TablePagination,
} from "../../../../../components";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetStore, useGetStoreProducts } from "../queries";
import { ProductItem } from "../../../components";
import { useDebounced } from "../../../../../hooks";
import { StoreProfile } from "../api/store-profile";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

const Store = () => {
  const { name } = useParams();
  const [params] = useSearchParams();

  const store = useGetStore(name);
  const debouncedParams = useDebounced(params.toString());
  const products = useGetStoreProducts(name, debouncedParams);

  const hasProducts = products.isSuccess && products.data?.rows.length > 0;
  const isEmpty = products.isSuccess && products.data?.rows.length === 0;

  return (
    <main className="lg:container lg:max-w-5xl">
      {store.isLoading && <StoreProfile.Skeleton />}
      {store.isSuccess && <StoreProfile store={store.data} />}
      {store.isError && (
        <EmptyPlaceholder className="mx-4 mt-4">
          <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
          <EmptyPlaceholder.Title>Error fetching store.</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            {store.error.message}
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}

      <section className="grid sm:grid-cols-4">
        <div className="hidden p-4 sm:block">
          <p className="text-sm font-medium tracking-tight">Filters</p>
        </div>
        <div className="space-y-6 p-4 sm:col-span-3">
          {products.isError && (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
              <EmptyPlaceholder.Title>
                Error fetching products.
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                {products.error.message}
              </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
          )}
          {isEmpty && (
            <div className="space-y-2">
              <p className="text-sm font-medium tracking-tight">Products</p>
              <p className="text-sm font-normal italic leading-tight text-muted-foreground">
                No products found.
              </p>
            </div>
          )}
          {products.isLoading && (
            <>
              <div className="space-y-2">
                <p className="text-sm font-medium tracking-tight">Search</p>
                <SkeletonInput label={false} />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium tracking-tight">Products</p>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(128px,1fr))] gap-4">
                  <ProductItem.Skeleton />
                  <ProductItem.Skeleton />
                  <ProductItem.Skeleton />
                  <ProductItem.Skeleton />
                  <ProductItem.Skeleton />
                  <ProductItem.Skeleton />
                </div>
              </div>
            </>
          )}
          {hasProducts && (
            <>
              <div className="space-y-2">
                <p className="text-sm font-medium tracking-tight">Search</p>
                <Input placeholder="Search products..." className="w-full" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium tracking-tight">Products</p>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(128px,1fr))] gap-4">
                  {products.data.rows.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <TablePagination totalRows={products.data?.count} />
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Store;
