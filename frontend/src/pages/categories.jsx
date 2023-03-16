import { useEffect, useState } from 'react';
import { CategoriesAPI } from '../features/categories';
import CategoryItem from '../features/categories/components/category-item';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const info = await CategoriesAPI.getAll();

      console.log(info);

      setCategories(info);
    } catch (error) {
      console.log('Categories', error);
    }
  };

  // TODO: Add skeleton loader
  if (!categories) return <div>Loading...</div>;

  return (
    <section className='mx-auto w-full max-w-7xl p-4'>
      <h2 className='text-xl'>Categories</h2>
      <div className='mt-5 grid gap-10 sm:grid-cols-2 lg:grid-cols-3'>
        {categories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
