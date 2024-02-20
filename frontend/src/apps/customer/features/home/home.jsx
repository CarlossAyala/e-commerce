import { SliderComponent } from "../../../../components";
import { useDocumentTitle } from "../../../../hooks";
import { useGetProfile } from "../../../../libs/auth";
import { useGetHistory } from "../history";
import { useGetProducts } from "../product";
import { useGetStores } from "../store";

const Home = () => {
  const { data: customer } = useGetProfile();
  useDocumentTitle("Home");
  const products = useGetProducts("");
  const history = useGetHistory("");
  const stores = useGetStores("");

  const isAuthenticated = !!customer;
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

export default Home;
