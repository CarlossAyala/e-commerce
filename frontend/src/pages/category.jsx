import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CategoriesAPI } from '../features/categories';
import { BestBrands, ListCategories, ListProducts } from '../features/common';
import ListSubCategories from '../features/sub-categories/components/list-sub-categories';

const Category = () => {
  const [allData, setAllData] = useState(null);

  const { cat } = useParams();

  // TODO: Obtener primero la categoría y si existe, traer toda la info
  // Sino, error page
  const getAllInfo = async () => {
    try {
      const allInfo = await Promise.allSettled([
        CategoriesAPI.getInfoParentCatBySlug(cat),
        CategoriesAPI.getBestSellers(cat),
        CategoriesAPI.getBestSubCategories(cat),
        CategoriesAPI.getBestBrands(cat),
      ]);

      console.log(allInfo);

      setAllData(allInfo);
    } catch (error) {
      console.log('Category', error);
    }
  };

  useEffect(() => {
    getAllInfo();
  }, []);

  // TODO: Skeleton Loader or something
  if (!allData) return <div>Loading...</div>;

  // bestSellers = Mejor Vendidos
  const [category, bestSellers, bestSubCats, bestBrands] = allData;

  // TODO: Añadir la sección "Populares" que se ordenará con los productos vendidos
  // dentro de los últimos 30 días

  return (
    <section className='mx-auto max-w-7xl space-y-5 p-4'>
      <div>
        <h3 className='text-lg font-medium uppercase leading-6 text-gray-900'>
          {category.value.name}
        </h3>
        <p className='mt-1 text-sm text-gray-500'>
          {category.value.description}
        </p>
      </div>
      <ListProducts products={bestSellers} />
      <ListCategories title='Best Sub-Categories' categories={bestSubCats} />
      <BestBrands brands={bestBrands} />
      <ListSubCategories category={category.value} />
    </section>
  );
};

export default Category;
