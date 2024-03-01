import { useGetProducts } from "@/shared/features/product";
import { useDocumentTitle } from "@/shared/hooks";
import { useAuth } from "@/shared/auth";
import { SliderComponent } from "@/components";
import { useGetHistory } from "../history";
import { useGetStores } from "../store";

export const Home = () => {
  useDocumentTitle("Home");
  const { isAuthenticated } = useAuth();
  const products = useGetProducts("");
  const history = useGetHistory("");
  const stores = useGetStores("");

  const hasHistory = history.data?.rows.length > 0;

  return (
    <main className="container flex-1 space-y-6">
      <SliderComponent
        className="mt-4"
        type="product"
        title="Products"
        items={products.data?.rows}
        {...products}
      />
      {isAuthenticated && hasHistory ? (
        <SliderComponent
          type="product"
          title="Your history"
          items={history.data?.rows.map(({ product }) => product)}
          {...history}
        />
      ) : null}
      <SliderComponent
        type="store"
        title="Stores"
        items={stores.data?.rows}
        {...stores}
      />
    </main>
  );
};
