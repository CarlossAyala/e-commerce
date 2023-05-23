import { Link, useNavigate } from 'react-router-dom';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <main className='grid h-screen place-content-center bg-white py-24 px-6 sm:py-32 lg:px-8'>
      <p className='text-base font-semibold text-indigo-600'>404 error</p>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
        Page not found
      </h1>
      <p className='mt-3 text-base leading-7 text-gray-600'>
        Sorry, the page you are looking for doesn&apos;t exist.
      </p>
      <div className='mt-6 flex items-center gap-x-3 text-base'>
        <button
          onClick={handleClick}
          className='flex flex-1 items-center justify-center gap-x-1 rounded-md border border-gray-200 bg-white py-2.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
        >
          <ArrowLongLeftIcon className='h-5 w-5' />
          <span>Go back</span>
        </button>

        <button className='flex-1 rounded-md bg-indigo-600 py-2.5 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          Take me home
        </button>
      </div>
    </main>
  );
};

export default NotFound;
