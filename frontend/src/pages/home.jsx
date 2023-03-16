import { useState, useEffect } from 'react';
import { BestBrands, ListCategories } from '../features/common';
import { HomeAPI } from '../features/home';

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
      <BestBrands brands={bestStores} />
      <ListCategories
        title='Categorías populares'
        categories={bestCategories}
      />
      <div>
        <h3 className='text-lg font-medium text-gray-900'>Tu historial</h3>
      </div>
    </section>
  );
};

export default Home;
