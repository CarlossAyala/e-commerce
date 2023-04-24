import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Address,
  Bookmarks,
  Cart,
  Categories,
  Category,
  History,
  Home,
  Product,
  Setting,
  Signup,
  Stores,
  Store,
} from '../../pages';
import CategoryProducts from '../../pages/category-products';
import { EditAddress, NewAddress, ViewAddress } from '../address';
import * as Card from '../card';
import * as Account from '../account';
import { MainLayout } from '../ui';

// Provate Routes
// <RequireAuth><Component /></RequireAuth>,

// Header  https://preline.co/examples/navigations-mega-menu.html
// use-pagination https://mantine.dev/hooks/use-pagination/
// Invoice https://preline.co/examples/application-invoice.html
// Tables https://preline.co/examples/application-tables.html
// Estadisticas https://preline.co/examples/application-stats.html

// PICTOGRAMS https://carbondesignsystem.com/guidelines/pictograms/library

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        // CART
        {
          path: 'cart',
          element: <Cart />,
        },
        // CATEGORIES
        {
          path: 'categories',
          element: <Categories />,
        },
        {
          path: 'c/:cat',
          element: <Category />,
        },
        {
          path: 'c/:cat/products',
          element: <CategoryProducts />,
        },
        // PRODUCTS
        {
          path: 'p/:id/:slug',
          element: <Product />,
        },
        // STORES
        {
          path: 'stores',
          element: <Stores />,
        },
        {
          path: 's/:slug',
          element: <Store />,
        },
        // FAVORITES
        {
          path: 'bookmarks',
          element: <Bookmarks />,
        },
        // HISTORY
        {
          path: 'history',
          element: <History />,
        },
        // SETTINGS
        {
          path: 'settings',
          element: <Setting />,
        },
        // ACCOUNT
        {
          path: 'settings/account',
          element: <Account.View />,
        },
        {
          path: 'settings/change-name',
          element: <Account.ChangeName />,
        },
        {
          path: 'settings/change-password',
          element: <Account.ChangePassword />,
        },
        // ADDRESS
        {
          path: 'settings/address',
          element: <Address />,
        },
        {
          path: 'settings/address/new',
          element: <NewAddress />,
        },
        {
          path: 'settings/address/view/:id',
          element: <ViewAddress />,
        },
        {
          path: 'settings/address/edit/:id',
          element: <EditAddress />,
        },
        // CARDS
        {
          path: 'settings/card',
          element: <Card.Home />,
        },
        {
          path: 'settings/card/new',
          element: <Card.New />,
        },
        {
          path: 'settings/card/view/:id',
          element: <Card.View />,
        },
        {
          path: 'settings/card/edit/:id',
          element: <Card.Edit />,
        },
      ],
    },
    {
      path: '/signin',
      element: <Signup />,
    },
    {
      path: '/signup',
      element: <h1>Im Sign up</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
