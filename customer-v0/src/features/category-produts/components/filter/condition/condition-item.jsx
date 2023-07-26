import { Field } from 'formik';

const ConditionItem = ({ condition }) => {
  return (
    <label className='flex items-center gap-2'>
      <Field type='checkbox' name='condition' value={condition} />
      <span className='text-sm capitalize text-gray-600'>{condition}</span>
    </label>
  );
};

export default ConditionItem;
