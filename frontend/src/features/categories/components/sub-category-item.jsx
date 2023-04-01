import { Link } from 'react-router-dom';
import { useImageOnLoad } from '../../utils/hooks';

const SubCategoryItem = ({ category }) => {
  const [onLoad, styles] = useImageOnLoad();

  return (
    <div className='rounded-md border shadow-md'>
      <Link to={`/s/${category.slug}`} className='block'>
        <div className='relative h-40 overflow-hidden rounded-t-md'>
          <img
            src={category.image}
            onLoad={onLoad}
            style={styles.thumbnail}
            className='h-full w-full object-cover object-center'
          />
          <img
            src={category.image}
            onLoad={onLoad}
            style={styles.fullSize}
            className='h-full w-full object-cover object-center'
          />
        </div>
        <div className='flex flex-col border-t border-gray-200 px-3 py-2 sm:px-4 sm:py-2'>
          <h3 className='font-semibold uppercase text-black'>
            {category.name}
          </h3>
          <p className='text-sm text-gray-500'>{category.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default SubCategoryItem;
