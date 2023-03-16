import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesAPI } from '../features/categories';
import { BestBrands, ListProducts } from '../features/common';

const SubCategory = () => {
  const [allData, setAllData] = useState(null);

  const { cat, sub } = useParams();

  const getAllInfo = async () => {
    try {
      const data = await Promise.allSettled([
        CategoriesAPI.getInfoChildrenCatBySlug(cat, sub),
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
  }, []);

  // TODO: Que hacer si subCat no pertenece a dicha Cat? y problemas con Cat y subCat

  // TODO: Skeleton Loader or something
  if (!allData) return <div>Loading...</div>;

  const [info, bestProducts, bestBrands] = allData;

  return (
    <section className='mx-auto max-w-7xl space-y-5 p-4'>
      <div>
        <h3 className='text-xl font-medium leading-6 text-gray-900'>
          {info.value.subCat.name}
        </h3>
        <p className='mt-1 text-sm text-gray-500'>
          {info.value.subCat.description}
        </p>
      </div>
      <ListProducts products={bestProducts} />
      <BestBrands brands={bestBrands} />
    </section>
  );
};

export default SubCategory;
