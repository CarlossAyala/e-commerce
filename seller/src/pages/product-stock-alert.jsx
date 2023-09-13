import { useSearchParams } from "react-router-dom";
import { TableStockAlert, useStockAlert } from "../features/product";
import { useDebounce } from "../utils/hooks";

const ProductStockAlert = () => {
  const [params, setParams] = useSearchParams();

  const debounced = useDebounce(params.toString(), 500);

  const products = useStockAlert(debounced);
  console.log("Stock alert", products);

  return (
    <main className="flex w-full flex-col overflow-auto bg-white">
      <section className="px-4 mt-3">
        <div className="mb-3">
          <h2 className="text-base font-semibold leading-6 text-gray-900">
            Stock alert
          </h2>
          <p className="text-sm text-gray-600 leading-snug">
            List of products with low stock.
          </p>
        </div>

        <TableStockAlert {...products} hasPagination />
      </section>
    </main>
  );
};

export default ProductStockAlert;
