import { Link } from 'react-router-dom';
import { useImageOnLoad } from '../../utils/hooks';
import clsx from 'clsx';

const StoreCard = ({ brand }) => {
  const [onLoad, { thumbnail, fullSize }] = useImageOnLoad();

  return (
    <Link
      className='group block overflow-hidden rounded-md border border-gray-100 shadow'
      to={`/s/${brand.slug}`}
    >
      <div className='relative overflow-hidden'>
        <img
          src={brand.profile}
          onLoad={onLoad}
          className={clsx(
            thumbnail,
            'h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-125'
          )}
        />
        <img
          src={brand.profile}
          onLoad={onLoad}
          className={clsx(
            fullSize,
            'h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-125'
          )}
        />
      </div>

      <div className='p-2 text-sm font-medium sm:text-base'>
        <h3 className='text-black'>{brand.name}</h3>
      </div>
    </Link>
  );
};

export default StoreCard;
