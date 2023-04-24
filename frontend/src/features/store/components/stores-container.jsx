import StoreCard from './store-card';

const StoresContainer = ({ stores }) => {
  return (
    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
      {stores.map((brand) => (
        <StoreCard brand={brand} key={brand.id} />
      ))}
    </div>
  );
};

export default StoresContainer;
