import { useState, useEffect } from 'react';
import { HomeAPI } from '../features/home';
import StoresContainer from '../features/store/components/stores-container';
import { CategoriesContainer } from '../features/category';

const Home = () => {
  const [sections, setSections] = useState(null);

  const init = async () => {
    try {
      const allInfo = await Promise.allSettled([
        HomeAPI.getBestStores(),
        HomeAPI.getBestCategories(),
      ]);

      // console.log(allInfo);

      setSections(allInfo);
    } catch (error) {
      console.log('Home', error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (!sections) return <h1>Loading</h1>;

  const [bestStores, bestCategories] = sections;

  return (
    <section className='mx-auto max-w-7xl space-y-5 p-4'>
      <div>
        <h3 className='text-lg font-medium text-gray-900'>Home</h3>
      </div>
      <section>
        <h2 className='text-lg font-medium text-gray-900'>Best Brands</h2>
        <div className='mt-2'>
          <StoresContainer stores={bestStores.value} />
        </div>
      </section>
      <section>
        <h2 className='text-lg font-medium text-gray-900'>
          Categorías populares
        </h2>
        <div className='mt-2'>
          <CategoriesContainer categories={bestCategories.value} />
        </div>
      </section>
      <div>
        <h3 className='text-lg font-medium text-gray-900'>Tu historial</h3>
      </div>
    </section>
  );
};

export default Home;
