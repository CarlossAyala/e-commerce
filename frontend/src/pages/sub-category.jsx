import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { CategoriesAPI } from '../features/categories';
import { BestBrands, ListProducts } from '../features/common';

const SubCategory = () => {
  const [allData, setAllData] = useState(null);

  const { sub } = useParams();

  const getAllInfo = async () => {
    try {
      const data = await Promise.allSettled([
        CategoriesAPI.getSubCatBySlug(sub),
        CategoriesAPI.getBestSellers(sub),
        CategoriesAPI.getBestBrands(sub),
      ]);

      console.log(data);

      setAllData(data);
    } catch (error) {
      console.log('Sub-category', error);
    }
  };

  useEffect(() => {
    getAllInfo();
  }, [sub]);

  // TODO: Que hacer si subCat no pertenece a dicha Cat? y problemas con Cat y subCat

  // TODO: Skeleton Loader or something
  if (!allData) return <div>Loading...</div>;

  const [subCategory, bestProducts, bestBrands] = allData;

  return (
    <main className='mx-auto max-w-7xl space-y-5 p-4'>
      <div>
        <h3 className='text-xl font-medium uppercase leading-6 text-gray-900'>
          {subCategory.value.name}
        </h3>
        <p className='mt-1 text-sm text-gray-500'>
          {subCategory.value.description}
        </p>
      </div>
      <ListProducts products={bestProducts} />
      <BestBrands brands={bestBrands} />
      <section>
        <h3 className='text-lg font-medium text-black'>
          {subCategory.value.parent.name}
        </h3>
        <ul className='mt-2 grid grid-cols-2 gap-2'>
          {subCategory.value.parent.children.map((item) => (
            <li className='flex items-center justify-start' key={item.id}>
              <NavLink
                to={`/s/${item.slug}`}
                className={({ isActive }) =>
                  clsx(
                    isActive
                      ? 'font-medium uppercase text-indigo-500'
                      : 'text-gray-500 hover:text-gray-800',
                    'py-1'
                  )
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default SubCategory;
