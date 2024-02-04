import { SliderComponent } from "../../../../components";
import { useCustomerAuth } from "../../../../libs/auth";
import { useGetHistory } from "../history";
import { useGetProducts } from "../product";
import { useGetStores } from "../store";

const Home = () => {
  const { isAuthenticated } = useCustomerAuth();
  const products = useGetProducts("");
  const history = useGetHistory("");
  const stores = useGetStores("");

  const hasHistory = history.data?.rows.length > 0;

  return (
    <main className="container flex-1 space-y-6">
      <SliderComponent
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

export default Home;
