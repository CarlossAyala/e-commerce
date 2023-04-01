const ProductDescription = ({ description }) => {
  return (
    <>
      <h3 className='font-medium uppercase'>Description</h3>
      <p className='text-gray-900'>{description}</p>
    </>
  );
};

export default ProductDescription;
