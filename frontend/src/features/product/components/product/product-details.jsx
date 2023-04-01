const ProductDetails = ({ product }) => {
  return (
    <ul>
      <li className='text-slate-900'>
        Stock: <span className='text-indigo-600'>{product.stock}</span>
      </li>
      <li className='text-slate-900'>
        Sold: <span className='text-indigo-600'>{product.sold}</span>
      </li>
      <li className='text-slate-900'>
        Condition:{' '}
        <span className='capitalize text-indigo-600'>{product.condition}</span>
      </li>
    </ul>
  );
};

export default ProductDetails;
