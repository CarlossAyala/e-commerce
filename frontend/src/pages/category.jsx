import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryAPI, ListSubCategories } from '../features/category';
import { BestSubCategeries } from '../features/category';
import { StoresContainer } from '../features/stores';
import ProductsContainer from '../features/product/components/products-container';

const Category = () => {
  const [data, setData] = useState(null);

  const { cat } = useParams();

  const getAllInfo = async () => {
    try {
      const info = await Promise.allSettled([
        CategoryAPI.getCategoryBySlug(cat),
        CategoryAPI.getBestSellers(cat),
        CategoryAPI.getBestSubCategories(cat),
        CategoryAPI.getBestBrands(cat),
      ]);

      console.log(info);

      setData(info);
    } catch (error) {
      console.log('Category', error);
    }
  };

  useEffect(() => {
    getAllInfo();
  }, [cat]);

  // TODO: Skeleton Loader or something
  if (!data) return <div>Loading...</div>;

  const [{ value: category }, { value: bestSellers }, bestSubCats, bestBrands] =
    data;

  const isParentCategory = !category.parent;

  return (
    <main className='mx-auto max-w-7xl space-y-5 p-4'>
      <div>
        <h3 className='text-lg font-medium uppercase leading-6 text-gray-900'>
          {category.name}
        </h3>
        <p className='mt-1 text-sm text-gray-500'>{category.description}</p>
      </div>
      <ProductsContainer products={bestSellers} />
      {isParentCategory && <BestSubCategeries categories={bestSubCats.value} />}
      <section>
        <h2 className='text-lg font-medium text-gray-900'>Best Brands</h2>
        <StoresContainer stores={bestBrands.value} />
      </section>
      <ListSubCategories
        category={category}
        isParentCategory={isParentCategory}
      />
    </main>
  );
};

export default Category;
