// import React from 'react';

const DescriptionList = ({ dt, dd }) => {
  return (
    <div className='px-4 py-3'>
      <dt className='text-gray-500'>{dt}</dt>
      <dd className='mt-1 text-gray-900'>{dd ? dd : '-'}</dd>
    </div>
  );
};

export default DescriptionList;

// className={clsx(
//         isEven(i) ? 'bg-gray-100 ' : 'bg-white',
//         'px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'
//       )}
