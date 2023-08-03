import { Link } from 'react-router-dom';
import { useGetCategories } from '../features/category';

const CategoryList = () => {
  const categories = useGetCategories();
  console.log('Categories', categories);

  return (
    <main className='flex w-full flex-col overflow-auto bg-white'>
      <section className='border-b border-gray-200 px-4 py-2'>
        <h1 className='text-2xl font-medium leading-none'>Category</h1>
        <h2 className='text-lg font-medium leading-snug text-gray-500'>List</h2>
      </section>

      {categories.isFetched && categories.data?.length > 0 && (
        <section className='px-4 py-3'>
          <ol className='space-y-10'>
            {categories.data.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/category/${category.slug}/view`}
                  className='text-lg font-bold leading-none text-gray-900'
                >
                  {category.name}
                </Link>
                <div>
                  <ol className='columns-2'>
                    {category.children.map((child) => (
                      <li key={child.id}>
                        <Link
                          to={`/category/${child.slug}/view`}
                          className='text-sm font-medium leading-none text-black'
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}
    </main>
  );
};

export default CategoryList;
