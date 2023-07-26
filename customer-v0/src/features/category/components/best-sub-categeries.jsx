import CategoryCard from './category-card';

const BestSubCategeries = ({ categories }) => {
  return (
    <section>
      <h3 className='text-lg font-medium text-gray-900'>Best Sub-Categories</h3>
      <div className='mt-3 grid gap-5 sm:grid-cols-2 md:grid-cols-3'>
        {/* Hay sub-categories */}
        {categories?.length > 0 ? (
          categories.map((category) => (
            <CategoryCard category={category} key={category.id} />
          ))
        ) : (
          <p>Todavía no hay hay la mejor categoría</p>
        )}
      </div>
    </section>
  );
};

export default BestSubCategeries;
