import { NavLink } from 'react-router-dom';
import ItemList from './item-list';
import clsx from 'clsx';

const ListSubCategories = ({ category, isParentCategory }) => {
  return (
    <section>
      {isParentCategory ? (
        <NavLink
          to={`/c/${category.slug}`}
          className={({ isActive }) =>
            clsx(
              'block py-1 text-lg font-medium uppercase',
              isActive
                ? 'font-medium uppercase text-indigo-500'
                : 'text-gray-900'
            )
          }
        >
          {category.name}
        </NavLink>
      ) : (
        <NavLink
          to={`/c/${category.parent.slug}`}
          className={({ isActive }) =>
            clsx(
              'block py-1 text-lg font-medium',
              isActive
                ? 'font-medium uppercase text-indigo-500'
                : 'text-gray-900'
            )
          }
        >
          {category.parent.name}
        </NavLink>
      )}
      <ul className='mt-2 grid grid-cols-2 gap-1'>
        {isParentCategory
          ? category.children.map((cat) => (
              <ItemList key={cat.id} category={cat} />
            ))
          : category.parent.children.map((cat) => (
              <ItemList key={cat.id} category={cat} />
            ))}
      </ul>
    </section>
  );
};

export default ListSubCategories;
