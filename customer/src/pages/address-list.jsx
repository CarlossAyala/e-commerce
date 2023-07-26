import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { useDeleteAddress, useGetAddresses } from '../features/address';
import { Button, Modal, SkeletonText } from '@carbon/react';
import {
  EllipsisVerticalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const CardAddressSkeleton = () => {
  return (
    <div className='bg-gray-100 p-4'>
      <div className='w-1/3'>
        <SkeletonText />
      </div>
      <div className='w-3/4'>
        <SkeletonText style={{ margin: '0' }} />
      </div>
    </div>
  );
};

const AddressList = () => {
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState(null);

  const addresses = useGetAddresses();
  const deleteAddress = useDeleteAddress();

  const handleDelete = async () => {
    try {
      await deleteAddress.mutateAsync(address.id);
      console.log('Deleted');

      setModal(false);
      setAddress(null);
    } catch (error) {
      console.log('AddressList');
      console.log('handleDelete', error);
    }
  };

  return (
    <main className='flex w-full flex-col bg-white'>
      <section className='border-b border-gray-200 px-4 pb-4 pt-3'>
        <h1 className='text-2xl leading-none'>Address</h1>
        <h2 className='mt-1 text-base leading-none tracking-wide text-gray-600'>
          List
        </h2>
      </section>
      {addresses.isLoading ? (
        <div className='mt-4'>
          <div className='flex items-center justify-between'>
            <div className='w-1/4'>
              <SkeletonText />
            </div>
            <div className='w-1/4'>
              <SkeletonText />
            </div>
          </div>
          <div className='space-y-2'>
            <CardAddressSkeleton />
            <CardAddressSkeleton />
            <CardAddressSkeleton />
          </div>
        </div>
      ) : null}
      {addresses.isFetched && !addresses.data ? (
        <section className='mt-4 px-4'>
          <div className='bg-gray-100 p-4'>
            <p className='mb-2 text-base font-semibold leading-none text-gray-900'>
              Address not found
            </p>
            <p className='text-sm leading-none text-gray-800'>
              Please check the address ID and try again.
            </p>
            <div className='mt-4'>
              <Link to='/account/address/list'>
                <Button size='md'>Go back to the list</Button>
              </Link>
            </div>
          </div>
        </section>
      ) : null}
      {addresses.isFetched && addresses.data?.length > 0 ? (
        <section className='mt-4 px-4'>
          <div className='flex items-center justify-between'>
            <p className='leading-none text-gray-500'>List of addresses</p>
            <Link to='/account/address/new'>Add new</Link>
          </div>

          <div className='mt-2 space-y-2'>
            {addresses.data.map((address) => (
              <div key={address.id} className='flex bg-gray-100 p-4'>
                <div className='grow'>
                  <p className='mb-1 text-base font-semibold text-gray-900'>
                    {address.street}
                  </p>
                  <p className='text-sm leading-snug text-gray-800'>
                    {address.province}
                    {` (${address.zipCode})`} - {address.city}
                  </p>
                  <p className='text-sm leading-snug text-gray-600'>
                    {address.name} - {address.phone}
                  </p>
                </div>
                <Menu as='div' className='relative inline-block text-left'>
                  <Menu.Button className='bg-gray-200 p-1.5 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600'>
                    <EllipsisVerticalIcon
                      className='h-6 w-6 text-gray-800 hover:text-gray-900'
                      aria-hidden='true'
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-40 origin-top-right divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <div className='px-1 py-1 '>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`/account/address/${address.id}/view`}
                              className={`${
                                active ? 'text-green-600 ' : 'text-gray-900'
                              } flex w-full items-center p-2 text-sm`}
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
                              to={`/account/address/${address.id}/edit`}
                              className={`${
                                active ? 'text-blue-600 ' : 'text-gray-900'
                              } flex w-full items-center p-2 text-sm`}
                            >
                              <PencilIcon
                                className='mr-2 h-5 w-5'
                                aria-hidden='true'
                              />
                              Edit
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div className='px-1 py-1'>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={clsx(
                                'flex w-full items-center p-2 text-sm',
                                active ? 'text-red-600 ' : 'text-gray-900'
                              )}
                              onClick={() => {
                                setModal(true);
                                setAddress(address);
                              }}
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
            ))}
          </div>
        </section>
      ) : null}
      {address && modal && (
        <Modal
          open={modal}
          onRequestClose={() => setModal(false)}
          onRequestSubmit={handleDelete}
          onSecondarySubmit={() => setModal(false)}
          modalLabel='Address'
          modalHeading='Delete an address'
          primaryButtonText='Delete'
          secondaryButtonText='Cancel'
          danger
          size='sm'
        >
          <div>
            <p className='mb-2 text-sm leading-none text-gray-800'>
              Are you sure you want to delete this address? This action cannot
              be undone.
            </p>
          </div>
          <div className='mt-4'>
            <p className='mb-1 text-base font-semibold text-gray-900'>
              {address.street}
            </p>
            <p className='text-sm leading-snug text-gray-800'>
              {address.province}
              {` (${address.zipCode})`} - {address.city}
            </p>
            <p className='text-sm leading-snug text-gray-600'>
              {address.name} - {address.phone}
            </p>
          </div>
        </Modal>
      )}
    </main>
  );
};

export default AddressList;
