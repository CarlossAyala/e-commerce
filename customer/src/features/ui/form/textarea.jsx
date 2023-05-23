import { useField } from 'formik';
import clsx from 'clsx';

const Textarea = ({ label, name, placeholder, opcional, hint }) => {
  const [field, meta] = useField(name);

  return (
    <>
      {label && (
        <div
          className={clsx(
            opcional ? 'flex items-center justify-between' : 'block',
            'mb-1'
          )}
        >
          <label htmlFor={name} className='font-normal dark:text-white'>
            {label}
          </label>
          {opcional && (
            <span className='block italic text-gray-400'>Opcional</span>
          )}
        </div>
      )}
      <textarea
        name={name}
        rows={3}
        className={clsx(
          meta.touched && meta.error
            ? 'ring-red-400 focus:ring-red-600'
            : 'ring-gray-300 focus:border-blue-500 focus:ring-blue-500',
          'block w-full resize-y rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:italic placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
        )}
        placeholder={placeholder}
        {...field}
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

export default Textarea;
