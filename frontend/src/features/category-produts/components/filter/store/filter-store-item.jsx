import { Field } from 'formik';

const FilterStoreItem = ({ store }) => {
  return (
    <label className='flex items-center gap-2'>
      <Field type='checkbox' name='stores' value={store.name} />
      <span className='text-sm text-gray-600'>{store.name}</span>
    </label>
  );
};

export default FilterStoreItem;
