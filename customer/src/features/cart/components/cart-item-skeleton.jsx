import { SkeletonPlaceholder, SkeletonText } from '@carbon/react';

const CartItemSkeleton = () => {
  return (
    <div className='flex'>
      <div className='mr-2'>
        <SkeletonPlaceholder />
      </div>
      <div className='flex flex-col justify-between'>
        <div>
          <div className='w-52'>
            <SkeletonText />
          </div>
          <div className='w-16'>
            <SkeletonText style={{ margin: '0' }} />
          </div>
        </div>
        <div className='w-20'>
          <SkeletonText style={{ margin: '0' }} />
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;
