import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link, useLocation } from 'react-router-dom';
import {
  EllipsisVerticalIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { AddressAPI } from '../features/address';
import { useAuth } from '../features/auth';

const Address = () => {
  const [addresses, setAddresses] = useState(null);

  const navigate = useLocation();
  const { jwt } = useAuth();

  const init = async () => {
    try {
      const data = await AddressAPI.getAll(jwt);

      console.log(data);
      setAddresses(data);
    } catch (error) {
      console.log('Address', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await AddressAPI.remove(jwt, id);

      setAddresses((curr) => curr.filter((address) => address.id !== id));
      console.log('Deleted!');
    } catch (error) {
      console.log('Address handleDelete', error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <section className='mx-auto w-full max-w-7xl p-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg leading-6 text-gray-900'>Addresses</h3>
          <p className='text-sm text-gray-500'>
            Personal details and application.
          </p>
        </div>
        <Link
          to='new'
          className='rounded-md bg-indigo-600 p-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          <PlusIcon className='h-5 w-5' />
        </Link>
      </div>
      <div className='mt-4 space-y-3'>
        {addresses?.length > 0
          ? addresses.map((address) => (
              <div
                key={address.id}
                className='flex items-start justify-between rounded-md border px-4 py-3 shadow'
              >
                <div>
                  <h3 className='font-semibold text-gray-800 '>
                    {address.name}
                  </h3>
                  <p className='text-sm text-gray-500'>
                    {`ZIP Code ${address.zipCode} - ${address.province} - ${address.city}`}
                  </p>
                  <p className='text-sm text-gray-500'>
                    {`${address.contactName} - ${address.contactPhone}`}
                  </p>
                </div>
                <Menu as='div' className='relative inline-block text-left'>
                  <div>
                    <Menu.Button className='flex justify-center rounded-md border border-gray-200 p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
                      <EllipsisVerticalIcon className='h-6 w-6 text-black' />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-1 w-40 origin-top-right divide-y divide-gray-100 rounded-md border bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <div className='space-y-1 px-1 py-1'>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`view/${address.id}`}
                              className={clsx(
                                active
                                  ? 'bg-violet-500 text-white'
                                  : 'text-gray-900',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                              )}
                            >
                              <EyeIcon
                                className='mr-2 h-5 w-5'
                                aria-hidden='true'
                              />
                              View
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`edit/${address.id}`}
                              className={clsx(
                                active
                                  ? 'bg-violet-500 text-white'
                                  : 'text-gray-900',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                              )}
                            >
                              <PencilIcon
                                className='mr-2 h-5 w-5'
                                aria-hidden='true'
                              />
                              Edit
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={clsx(
                                active
                                  ? 'bg-violet-500 text-white'
                                  : 'text-gray-800',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                              )}
                              onClick={() => handleDelete(address.id)}
                            >
                              <TrashIcon
                                className='mr-2 h-5 w-5'
                                aria-hidden='true'
                              />
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ))
          : null}
      </div>
    </section>
  );
};

export default Address;
