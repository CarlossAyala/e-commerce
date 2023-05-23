import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './layout';
import { Dashboard, PublishProduct, Signin, Signup } from './pages';
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
        path: 'publish',
        element: <PublishProduct />,
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
