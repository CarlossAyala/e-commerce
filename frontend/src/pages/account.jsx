import { ChevronRightIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const navigations = [
  {
    label: 'Direcciones',
    to: 'address',
    description: 'Modificá tus direcciones o agregá una nueva',
  },
  {
    label: 'Mis tarjetas',
    to: 'card',
    description: 'Gestioná tus tarjetas',
  },
];

const Account = () => {
  return (
    <main className='mx-auto w-full max-w-7xl flex-1 p-4'>
      <div className='mx-auto max-w-md'>
        <h2 className='text-lg font-medium text-gray-900'>Mi cuenta</h2>
        <div className='mt-2'>
          <Link
            to='#'
            className='group flex justify-between rounded-md border p-2 shadow'
          >
            <div className='flex items-center'>
              <UserCircleIcon className='h-12 w-12' />

              <div className='ml-5 grow'>
                <h3 className='font-medium'>Email us</h3>
                <p className='text-gray-500'>info@site.com</p>
              </div>
            </div>
            <div className='flex items-center'>
              <ChevronRightIcon className='h-5 w-5 text-gray-500' />
            </div>
          </Link>
        </div>

        <nav className='mt-6'>
          <h3 className='text-lg font-medium text-gray-900'>
            Configuración general
          </h3>
          <ul className='mt-2 space-y-3'>
            {navigations.map((nav) => (
              <li key={nav.label}>
                <Link
                  className='group flex flex-col rounded-md border p-3 shadow'
                  to={nav.to}
                >
                  <div className='flex items-center justify-between'>
                    <div>
                      <h3 className='text-gray-800 group-hover:text-blue-600'>
                        {nav.label}
                      </h3>
                      <p className='text-sm text-gray-500'>{nav.description}</p>
                    </div>
                    <div>
                      <ChevronRightIcon className='h-5 w-5 text-gray-500' />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
};

export default Account;
