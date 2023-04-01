import { useParams, useSearchParams } from 'react-router-dom';
import {
  CategoryProductAPI,
  Filter,
  SortBy,
} from '../features/category-produts';
import { useEffect, useState } from 'react';

const CategoryProducts = () => {
  const [products, setProducts] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { cat } = useParams();

  const getProducts = async () => {
    try {
      const query = searchParams.toString();
      const data = await CategoryProductAPI.getCategoryProducts(cat, query);

      console.log('Products', data);

      setProducts(data);
    } catch (error) {
      console.log('CategoryProducts', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  if (!products) return <h1>Loading...</h1>;

  return (
    <main className='mx-auto w-full max-w-7xl p-4'>
      <div className='flex items-start justify-between'>
        <h1 className='text-xl font-medium leading-6 text-gray-900'>
          Products
        </h1>
        <div className='flex items-center justify-center gap-x-2'>
          <SortBy params={searchParams} setParams={setSearchParams} />
          <Filter params={searchParams} setParams={setSearchParams} />
        </div>
      </div>
      <section>
        <div className='grid space-y-2 divide-y divide-gray-200 '>
          {products.rows.length > 0 &&
            products.rows.map((product) => (
              <div key={product.id} className='p-2'>
                <div>{product.name}</div>
                <div>{product.price}</div>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
};

export default CategoryProducts;
