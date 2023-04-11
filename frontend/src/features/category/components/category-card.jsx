import { Link } from 'react-router-dom';
import { useImageOnLoad } from '../../utils/hooks';
import clsx from 'clsx';

const CategoryCard = ({ category }) => {
  const [onLoad, { thumbnail, fullSize }] = useImageOnLoad();

  return (
    <Link
      to={`/c/${category.slug}`}
      className='group block rounded-md border border-gray-100 shadow'
    >
      <div className='relative h-40 overflow-hidden rounded-t-md'>
        <img
          src={category.image}
          onLoad={onLoad}
          className={clsx(
            thumbnail,
            'h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-125'
          )}
        />
        <img
          src={category.image}
          onLoad={onLoad}
          className={clsx(
            fullSize,
            'h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-125'
          )}
        />
      </div>
      <div className='flex flex-col border-t border-gray-200 px-3 py-2 sm:px-4 sm:py-2'>
        <h3 className='font-semibold uppercase text-black'>{category.name}</h3>
        <p className='text-sm text-gray-500'>{category.description}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
