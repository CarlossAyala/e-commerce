import ItemSubCategory from './item-sub-category';

const ListSubCategories = ({ category }) => {
  return (
    <div>
      <h3 className='text-lg font-medium uppercase text-black'>
        {category.name}
      </h3>
      <ul className='mt-2 grid grid-cols-2 gap-2'>
        {category.children?.length > 0 &&
          category.children.map((subCategory) => (
            <ItemSubCategory category={subCategory} key={subCategory.id} />
          ))}
      </ul>
    </div>
  );
};

export default ListSubCategories;
