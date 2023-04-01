import SubCategoryItem from './sub-category-item';

const BestSubCategeries = ({ categories }) => {
  return (
    <section>
      <h3 className='text-lg font-medium text-gray-900'>Best Sub-Categories</h3>
      <div className='mt-3 grid gap-5 sm:grid-cols-2 md:grid-cols-3'>
        {categories.map((category) => (
          <SubCategoryItem category={category} key={category.id} />
        ))}
      </div>
    </section>
  );
};

export default BestSubCategeries;
