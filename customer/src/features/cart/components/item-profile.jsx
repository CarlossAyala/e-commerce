const ItemProfile = ({ item }) => {
  return (
    <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
      <img
        src={
          'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg'
        }
        alt={item.imageAlt}
        className='h-full w-full object-cover object-center'
      />
    </div>
  );
};

export default ItemProfile;
