import { useGetProducts } from "@/shared/features/product";
import { useGetCategories } from "@/shared/features/categories";
import {
  CategoriesCarousel,
  ProductsCarousel,
  StoresCarousel,
} from "@/apps/e-commerce/components";
import { useDocumentTitle } from "@/shared/hooks";
import { EmptyState } from "@/shared/components";
import { useGetStores } from "../../stores";

export const Home = () => {
  useDocumentTitle("Home");

  const products = useGetProducts();
  const stores = useGetStores();
  const categories = useGetCategories();

  return (
    <main className="container flex-1 space-y-6 pb-10">
      <section className="mt-4 space-y-2">
        <h2 className="text-xl font-semibold md:text-2xl">Products</h2>

        {products.isLoading ? (
          <ProductsCarousel.Skeleton />
        ) : products.isError ? (
          <EmptyState
            title="Something went wrong!"
            description="Please try again later"
          />
        ) : !products.data?.rows?.length ? (
          <EmptyState title="No products" description="No products found" />
        ) : (
          <ProductsCarousel products={products.data?.rows} />
        )}
      </section>

      <section className="mt-4 space-y-2">
        <h2 className="text-xl font-semibold md:text-2xl">Stores</h2>

        {stores.isLoading ? (
          <StoresCarousel.Skeleton />
        ) : stores.isError ? (
          <EmptyState
            title="Something went wrong!"
            description="Please try again later"
          />
        ) : !stores.data?.rows?.length ? (
          <EmptyState title="No stores" description="No stores found" />
        ) : (
          <StoresCarousel stores={stores.data?.rows} />
        )}
      </section>

      <section className="mt-4 space-y-2">
        <h2 className="text-xl font-semibold md:text-2xl">Categories</h2>

        {categories.isLoading ? (
          <CategoriesCarousel.Skeleton />
        ) : categories.isError ? (
          <EmptyState
            title="Something went wrong!"
            description="Please try again later"
          />
        ) : !categories.data?.length ? (
          <EmptyState title="No categories" description="No categories found" />
        ) : (
          <CategoriesCarousel categories={categories.data} />
        )}
      </section>
    </main>
  );
};
