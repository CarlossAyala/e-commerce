import { productColumnsFull, useGetProducts } from "..";
import { DataTableFull } from "../../../../components";

const ProductList = () => {
  const products = useGetProducts();

  return (
    <main className="flex w-full flex-col space-y-4 overflow-auto">
      <section className="mt-2 px-4">
        <h1 className="text-2xl font-bold tracking-tight">Product List</h1>
        <p className="text-muted-foreground">
          Here are all the products in your store.
        </p>
      </section>

      <DataTableFull query={products} columns={productColumnsFull} />
    </main>
  );
};

export default ProductList;
