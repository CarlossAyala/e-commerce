import { Link } from 'react-router-dom';
import {
  ChevronRightIcon,
  CreditCardIcon,
  MapPinIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const accountLinks = [
  {
    label: 'Profile',
    description: 'View and update your profile',
    to: '/account/profile',
    icon: UserCircleIcon,
  },
  {
    label: 'Address',
    description: 'View and update your addresses',
    to: '/account/address/list',
    icon: MapPinIcon,
  },
  {
    label: 'Cards',
    description: 'View and update your credit cards',
    to: '/account/cards',
    icon: CreditCardIcon,
  },
];

const Account = () => {
  return (
    <main className='flex w-full flex-col overflow-auto bg-white'>
      <section className='p-4 py-3'>
        <h1 className='text-2xl font-semibold'>Account</h1>
        <p className='text-sm text-gray-600'>
          Manage your account and personal information.
        </p>

        <ul className='mt-6 space-y-4'>
          {accountLinks.map(({ label, to, description, icon: Icon }) => (
            <li key={to} className='group'>
              <Link
                to={to}
                className='flex items-center rounded-md border border-gray-200 p-2 shadow-md group-hover:border-gray-400'
              >
                <div className='shrink-0 rounded-full bg-gray-100 p-2'>
                  <Icon
                    className='h-10 w-10 text-blue-400 group-hover:text-blue-600'
                    strokeWidth={1}
                  />
                </div>
                <div className='ml-2 grow'>
                  <p className='text-base font-medium leading-snug text-gray-900'>
                    {label}
                  </p>
                  <p className='mt-1 text-sm leading-none text-gray-500'>
                    {description}
                  </p>
                </div>
                <div className='flex items-center px-2'>
                  <ChevronRightIcon className='h-5 w-5 text-blue-400 group-hover:text-blue-600' />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Account;
