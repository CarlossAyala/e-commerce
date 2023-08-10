import { Link } from 'react-router-dom';
import { SkeletonText } from '@carbon/react';
import { useGetProfile } from '../auth';

const ProfileSkeleton = () => {
  return (
    <div className='bg-gray-50 p-4'>
      <div className='w-1/4'>
        <SkeletonText />
      </div>
      <div className='w-1/2'>
        <SkeletonText />
        <SkeletonText />
      </div>
    </div>
  );
};

const Account = () => {
  const customer = useGetProfile();

  console.log('Customer', customer);

  return (
    <main className='flex w-full flex-col overflow-auto bg-white'>
      <section className='border-b border-gray-200 px-4 py-3'>
        <h1 className='text-xl font-medium leading-none'>Account</h1>
      </section>

      <section className='p-4'>
        {customer.isLoading ? (
          <ProfileSkeleton />
        ) : (
          <div className='flex items-center gap-x-2'>
            <div className='h-14 w-14 shrink-0 overflow-hidden rounded-full'>
              <img
                className='h-full w-full object-cover'
                src='https://cdn.dribbble.com/users/6903298/avatars/small/350ff7d3d2a5470d9c9b1d8a05c823aa.png?1671623912'
                alt='Dribble Random User'
              />
            </div>
            <div>
              <p className='line-clamp-1 text-base font-semibold leading-normal text-gray-900'>
                {`${customer.data.name} ${customer.data.lastName}`}
              </p>
              <p className='line-clamp-1 text-sm font-medium leading-normal text-gray-600'>
                {customer.data.email}
              </p>
            </div>
          </div>
        )}
      </section>

      <section className='space-y-4 p-4'>
        <ul>
          <li className='flex'>
            <div className='h-14 w-14 shrink-0 rounded-full bg-black/20'></div>
            <div>
              <Link
                className='text-sm font-medium leading-normal text-gray-900'
                to='/account/profile'
              >
                Profile
              </Link>
            </div>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Account;
