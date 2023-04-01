import { StoreItem } from '../../stores';

const BestBrands = ({ brands }) => {
  const { status, value, reason } = brands;
  // console.log('Best Brands', brands);

  return (
    <section>
      <h2 className='text-lg font-medium text-gray-900'>Best Brands</h2>
      <div className='mt-3 flex flex-wrap justify-between gap-5'>
        {value.map((brand) => (
          <StoreItem brand={brand} key={brand.id} />
        ))}
      </div>
    </section>
  );
};

export default BestBrands;
