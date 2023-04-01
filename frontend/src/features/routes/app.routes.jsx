import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Account,
  Address,
  Cart,
  Categories,
  Category,
  Home,
  Product,
  Signup,
  SubCategory,
} from '../../pages';
import CategoryProducts from '../../pages/category-products';
import { EditAddress, NewAddress, ViewAddress } from '../address';
import * as Card from '../card';
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
        // ACCOUNT
        {
          path: 'account',
          element: <Account />,
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
          path: 's/:sub',
          element: <SubCategory />,
        },
        {
          path: 'c/:cat/products',
          element: <CategoryProducts />,
        },
        {
          path: 's/:cat/products',
          element: <CategoryProducts />,
        },
        // PRODUCT
        {
          path: 'p/:id/:slug',
          element: <Product />,
        },
        // ADDRESS
        {
          path: 'account/address',
          element: <Address />,
        },
        {
          path: 'account/address/new',
          element: <NewAddress />,
        },
        {
          path: 'account/address/view/:id',
          element: <ViewAddress />,
        },
        {
          path: 'account/address/edit/:id',
          element: <EditAddress />,
        },
        // CARDS
        {
          path: 'account/card',
          element: <Card.Home />,
        },
        {
          path: 'account/card/new',
          element: <Card.New />,
        },
        {
          path: 'account/card/view/:id',
          element: <Card.View />,
        },
        {
          path: 'account/card/edit/:id',
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

  // ...homeRoutes, ...accountRoutes

  return <RouterProvider router={router} />;
};

export default AppRoutes;
//       <Routes>
//         <Route path='/' element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path='categories' element={<Categories />} />
//           <Route path='c/:cat' element={<Category />} />
//           <Route path='c/:cat/s/:subCat' element={<SubCategory />} />
//           <Route path='p/:slug/:id' element={<Product />} />
//           <Route path='best-sellers' element={<BestSellers />} />
//           <Route path='stores' element={<div>All Stores</div>} />
//           <Route path='stores/:slug/:id' element={<div>Store X</div>} />
//           <Route path='official-stores' element={<OfficialStores />} />
//           <Route path='addresses' element={<>Test</>} />
//         </Route>
//         <Route path='/signin' element={<Login />} />
//         <Route path='/signup' element={<h1>Sign up</h1>} />
//         <Route path='*' element={<NotFound />} />
//       </Routes>
