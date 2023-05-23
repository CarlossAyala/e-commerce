import StoreFilter from '../features/store/components/filter/store-filter';
import StoreOrder from '../features/store/components/order/store-order';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StoresAPI from '../features/store/stores.api';
import { Pagination } from '../features/ui';
import ProductsContainer from '../features/product/components/products-container';

const Store = () => {
  const [param] = useSearchParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState(null);

  const { slug } = useParams();

  const getInfoStore = async () => {
    try {
      const data = await StoresAPI.getStoreBySlug(slug);

      // console.log('Store', data);

      setStore(data);
    } catch (error) {
      console.log('Store AllInfo', error);
    }
  };

  const getProducts = async () => {
    try {
      // TODO: Sanatize query param
      const query = param.toString();

      const data = await StoresAPI.getStoreProducts(slug, query);

      // console.log('Products', data);

      setProducts(data);
    } catch (error) {
      console.log('Store AllInfo', error);
    }
  };

  useEffect(() => {
    getInfoStore();
    getProducts();
  }, []);

  useEffect(() => {
    getProducts();
  }, [param.toString()]);

  return (
    <main className='mx-auto flex h-full w-full max-w-7xl flex-col divide-y divide-gray-200'>
      {/* profile - name - is an official store */}
      <div className='flex items-start px-4 py-3'>
        <div className='mr-4 h-16 w-16 overflow-hidden rounded border border-gray-200 bg-white shadow-lg'>
          <img className='h-full w-full object-cover' src={store?.profile} />
        </div>
        <div>
          <h1 className='text-lg font-medium leading-tight'>{store?.name}</h1>
          <span className='text-sm text-gray-400'>
            {store?.official ? 'Official Store' : 'No Official Store'}
          </span>
        </div>
      </div>
      {/* OrderBy - Filter */}
      <div className='flex items-center'>
        <StoreOrder />
        <StoreFilter />
      </div>
      {/* Title: Products */}
      <div className='mb-10 px-4'>
        <h1 className='mt-3 mb-4 text-lg uppercase text-slate-900'>
          List Products
        </h1>
        {products?.rows?.length && (
          <ProductsContainer products={products.rows} />
        )}
      </div>
      <div className='mt-auto'>
        <Pagination totalItems={products?.count} />
      </div>
    </main>
  );
};

export default Store;
