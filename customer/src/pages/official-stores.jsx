import { useEffect, useState } from 'react';
import { BusinessAPI } from '../features/business';
import { Link } from 'react-router-dom';

const OfficialStores = () => {
  const [officials, setOfficials] = useState(null);

  useEffect(() => {
    getOfficialStores();
  }, []);

  const getOfficialStores = async () => {
    const [url, options] = BusinessAPI.getOfficialStores();

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      console.log(data);

      if (!response.ok) throw new Error(data?.message || response.statusText);

      setOfficials(data);
    } catch (error) {
      console.log('Official Stores', error);
    }
  };

  // TODO: Add skeleton loader
  if (!officials) return <div>Loading...</div>;

  return (
    <section className='mx-auto max-w-7xl space-y-5 px-8 py-4'>
      <h2 className='mb-5 text-lg font-medium'>Official Stores</h2>
      <div className='grid grid-cols-5 gap-5'>
        {officials?.length > 0 &&
          officials.map((official) => (
            <Link to={`/store/${official.slug}`} key={official.id}>
              <div className='grid grid-cols-2 rounded-md border border-gray-200 shadow-md transition duration-150 ease-in-out hover:-translate-y-1'>
                <img
                  className='aspect-square h-28 w-28 rounded-lg p-1'
                  src={official.profile}
                />
                <div className='flex items-center px-2'>
                  <strong className='text-sm font-normal text-slate-900'>
                    {official.name}
                  </strong>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default OfficialStores;
