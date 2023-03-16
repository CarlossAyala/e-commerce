import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BestSellerAPI } from '../features/best-seller';
import { Formater } from '../features/utils/helpers';

// https://www.mercadolibre.com.ar/mas-vendidos#menu-user

const BestSellers = () => {
  const [bests, setBests] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const [url, options] = BestSellerAPI.getBestSellers();

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      console.log(data);

      if (!response.ok) throw new Error(data?.message || response.statusText);

      setBests(data);
    } catch (error) {
      console.log('Best Sellers', error);
    }
  };

  // TODO: Add skeleton loader
  if (!bests) return <div>Loading...</div>;

  return (
    <section className='mx-auto max-w-7xl space-y-5 px-8 py-4'>
      <h2 className='mb-5 text-lg font-medium'>Best Sellers</h2>
      <div className='grid gap-5'>
        {bests.length > 0 &&
          bests.map(({ category, products }, index) => (
            <div key={index}>
              <div className='flex items-center'>
                <Link to={`/c/${category.slug}`}>
                  <h3>{category.name}</h3>
                </Link>
                {/* TODO: Add Show more o something like that */}
              </div>
              <ul className='mt-2 grid grid-cols-6 gap-2'>
                {products.map((product) => (
                  <li className='rounded bg-indigo-500' key={product.id}>
                    <Link to={`/${category.slug}/${product.slug}`}>
                      <div className='flex h-60 flex-col text-white'>
                        <div>{product.name}</div>
                        <div>{Formater.price(product.price)}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </section>
  );
};

export default BestSellers;
