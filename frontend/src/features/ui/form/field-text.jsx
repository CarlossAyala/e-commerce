import { useField } from 'formik';
import clsx from 'clsx';

const FieldText = ({ label, opcional, hint, type = 'text', ...rest }) => {
  const [field, meta] = useField(rest);

  return (
    <>
      {label && (
        <div
          className={clsx(
            opcional ? 'flex items-center justify-between' : 'block',
            'mb-1'
          )}
        >
          <label
            htmlFor={rest.id || rest.name}
            className='font-normal dark:text-white'
          >
            {label}
          </label>
          {opcional && <span className='italic text-gray-400'>Opcional</span>}
        </div>
      )}
      <input
        className={clsx(
          meta.touched && meta.error
            ? 'ring-red-400 focus:ring-red-600'
            : 'ring-gray-300 focus:border-blue-500 focus:ring-blue-500',
          'block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:italic placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
        )}
        type={type}
        {...field}
        {...rest}
      />
      {meta.touched && meta.error && (
        <p className='mt-1 text-sm text-red-600'>{meta.error}</p>
      )}
      {hint && (
        <p className='mt-1 text-sm text-gray-500' id='hs-input-helper-text'>
          {hint}
        </p>
      )}
    </>
  );
};

export default FieldText;
