import { Link } from 'react-router-dom';

const ItemSubCategory = ({ category }) => {
  return (
    <li className='flex items-center justify-start'>
      <Link
        to={`s/${category.slug}`}
        className='py-1 text-gray-500 hover:text-gray-800'
      >
        {category.name}
      </Link>
    </li>
  );
};

export default ItemSubCategory;
