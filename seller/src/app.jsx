import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './layout';
import {
  Dashboard,
  ProductEdit,
  ProductList,
  ProductPublish,
  ProductQuestions,
  ProductsQuestions,
  ProductView,
  Signin,
  Signup,
  Store,
  StoreNew,
} from './pages';
import SellerProvider from './seller.provider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'product/publish',
        element: <ProductPublish />,
      },
      {
        path: 'product/list',
        element: <ProductList />,
      },
      {
        path: 'product/view/:id',
        element: <ProductView />,
      },
      {
        path: 'product/edit/:id',
        element: <ProductEdit />,
      },
      {
        path: 'product/question/list',
        element: <ProductsQuestions />,
      },
      {
        path: 'product/:id/question/list',
        element: <ProductQuestions />,
      },
      {
        path: 'store',
        element: <Store />,
      },
      {
        path: 'store/new',
        element: <StoreNew />,
      },
    ],
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

function App() {
  return (
    <SellerProvider>
      <RouterProvider router={router} />
    </SellerProvider>
  );
}

export default App;
