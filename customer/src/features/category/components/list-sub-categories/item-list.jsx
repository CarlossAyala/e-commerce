import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const ItemList = ({ category }) => {
  return (
    <li key={category.id}>
      <NavLink
        to={`/c/${category.slug}`}
        className={({ isActive }) =>
          clsx(
            'block py-1',
            isActive ? 'font-medium uppercase text-indigo-500' : 'text-gray-500'
          )
        }
      >
        {category.name}
      </NavLink>
    </li>
  );
};

export default ItemList;
