import AppProvider from './features/provider/app.provider';
import AppRoutes from './features/routes/app.routes';
import * as Cart from './features/cart';

const App = () => {
  return (
    <AppProvider>
      <Cart.Provider>
        <AppRoutes />
      </Cart.Provider>
    </AppProvider>
  );
};

export default App;
