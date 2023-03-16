const TCaption = ({ title, description }) => {
  return (
    <caption className='flex flex-col items-start border-b border-gray-200 px-4 py-2'>
      <h2 className='text-xl font-semibold text-gray-800'>{title}</h2>
      <p className='text-sm text-gray-600'>{description}</p>
    </caption>
  );
};

export default TCaption;
