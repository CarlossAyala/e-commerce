import CategoryItem from '../../categories/components/category-item';

const ListCategories = ({ title = 'Categorias', categories }) => {
  const { status, value, reason } = categories;
  // console.log('Best Sub-Categories', value);

  return (
    <section>
      <h3 className='text-lg font-medium text-gray-900'>{title}</h3>
      <div className='mt-3 grid gap-5 sm:grid-cols-2 md:grid-cols-3'>
        {value.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </div>
    </section>
  );
};

export default ListCategories;
