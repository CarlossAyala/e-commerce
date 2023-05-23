import { useEffect, useState } from 'react';
import { CategoryAPI } from '../features/category';
import CategoryCard from '../features/category/components/category-card';

const Categories = () => {
  const [categories, setCategories] = useState(null);

  const getCategories = async () => {
    try {
      const info = await CategoryAPI.getAll();

      // console.log(info);

      setCategories(info);
    } catch (error) {
      console.log('Categories', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // TODO: Add skeleton loader
  if (!categories) return <div>Loading...</div>;

  return (
    <section className='mx-auto w-full max-w-7xl p-4'>
      <h2 className='text-xl'>Categories</h2>
      <div className='mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        {categories?.length > 0 &&
          categories.map((category) => (
            <CategoryCard category={category} key={category.id} />
          ))}
      </div>
    </section>
  );
};

export default Categories;
