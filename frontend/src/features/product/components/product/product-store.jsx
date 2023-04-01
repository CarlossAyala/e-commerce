import { Link } from 'react-router-dom';

const ProductStore = ({ store }) => {
  return (
    <>
      <Link to={`/store/${store.id}`} className='flex items-start'>
        <div className='h-14 w-14 overflow-hidden rounded-md'>
          <img
            className='h-full w-full object-cover object-center'
            src={store.profile}
            alt={`Profile of ${store.name} store`}
          />
        </div>
        <div className='px-2'>
          <h3 className=''>{store.name}</h3>
          {store.official && (
            <p className='text-sm text-gray-500'>Official Fak-Ommerce store</p>
          )}
        </div>
      </Link>
    </>
  );
};

export default ProductStore;
