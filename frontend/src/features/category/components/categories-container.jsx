import CategoryCard from './category-card';

const CategoriesContainer = ({ categories }) => {
  return (
    <div className='grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {categories.map((category) => (
        <CategoryCard category={category} key={category.id} />
      ))}
    </div>
  );
};

export default CategoriesContainer;
