import { Link } from 'react-router-dom';

const StoreItem = ({ brand }) => {
  return (
    <Link
      className='group block w-44 overflow-hidden rounded-md border border-gray-200 shadow'
      to={`/s/${brand.id}/${brand.slug}`}
    >
      <div>
        <div className='flex-shrink-0 overflow-hidden rounded-t-md'>
          <img
            className='h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105'
            src={brand.profile}
            alt='Image Description'
          />
        </div>

        <div className='p-2 text-center'>
          <h3 className='text-black'>{brand.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default StoreItem;
