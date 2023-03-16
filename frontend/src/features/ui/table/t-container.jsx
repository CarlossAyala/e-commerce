const TContainer = ({ children }) => {
  return (
    <div className='overflow-x-auto'>
      <div className='mb-2 inline-block min-w-full overflow-hidden rounded-md border border-gray-200 shadow'>
        <div className='flex flex-col'>{children}</div>
      </div>
    </div>
  );
};

export default TContainer;
