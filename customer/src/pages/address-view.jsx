import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDeleteAddress, useGetAddress } from '../features/address';
import { Button, Modal, SkeletonText } from '@carbon/react';
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const ListInformationSkeleton = () => {
  return (
    <div className='p-4'>
      <div className='w-1/3'>
        <SkeletonText />
      </div>
      <div className='w-full'>
        <SkeletonText style={{ margin: '0' }} />
      </div>
    </div>
  );
};

const AddressView = () => {
  const [modal, setModal] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const address = useGetAddress(id);
  const deleteAddress = useDeleteAddress();

  const handleDelete = async () => {
    try {
      await deleteAddress.mutateAsync(id);
      console.log('Deleted');

      setModal(false);
      navigate('/account/address/list');
    } catch (error) {
      console.log('AddressView');
      console.log('handleDelete', error);
    }
  };

  return (
    <main className='flex w-full flex-col bg-white'>
      <section className='border-b border-gray-200 px-4 pb-4 pt-3'>
        <h1 className='text-2xl leading-none'>Address</h1>
        <h2 className='mt-1 text-base leading-none tracking-wide text-gray-600'>
          View
        </h2>
      </section>
      {address.isLoading ? (
        <div className='mt-4'>
          <div className='flex flex-col px-4'>
            <div className='w-1/3'>
              <SkeletonText />
            </div>
            <div className='w-3/4'>
              <SkeletonText />
            </div>
          </div>
          <div className='divide-y divide-gray-100 border-y border-gray-100'>
            <ListInformationSkeleton />
            <ListInformationSkeleton />
            <ListInformationSkeleton />
            <ListInformationSkeleton />
            <ListInformationSkeleton />
            <ListInformationSkeleton />
          </div>
        </div>
      ) : null}
      {!id || (address.isFetched && !address.data) ? (
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
      {address.isFetched && address.data ? (
        <section>
          <div className='flex gap-x-px p-4'>
            <div className='grow'>
              <h3 className='text-base font-semibold text-gray-900'>
                Address Information
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Personal details and application.
              </p>
            </div>
            <Menu as='div' className='relative inline-block text-left'>
              <Menu.Button className='p-1.5 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600'>
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
                          to={`/account/address/${address.data.id}/edit`}
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
                          onClick={() => setModal(true)}
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
          <dl className='divide-y divide-gray-100 border-y border-gray-100'>
            <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Full name
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {address.data.name}
              </dd>
            </div>
            <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Phone
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {address.data.phone}
              </dd>
            </div>
            <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Zip code
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {address.data.zipCode}
              </dd>
            </div>
            <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Province
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {address.data.province}
              </dd>
            </div>
            <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                City
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {address.data.city}
              </dd>
            </div>
            <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Street
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {address.data.street}
              </dd>
            </div>
            <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Apartment number
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {address.data.apartmentNumber}
              </dd>
            </div>
            <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Aditional information
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {address.data.aditional ? (
                  address.data.aditional
                ) : (
                  <span className='italic'>None</span>
                )}
              </dd>
            </div>
          </dl>

          <div className='p-4'>
            <Link to='/account/address/list'>
              <Button type='button' kind='secondary' size='lg'>
                Volver
              </Button>
            </Link>
          </div>

          {modal && (
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
                  Are you sure you want to delete this address? This action
                  cannot be undone.
                </p>
              </div>
              <div className='mt-4'>
                <p className='mb-1 text-base font-semibold text-gray-900'>
                  {address.data.street}
                </p>
                <p className='text-sm leading-snug text-gray-800'>
                  {address.data.province}
                  {` (${address.data.zipCode})`} - {address.data.city}
                </p>
                <p className='text-sm leading-snug text-gray-600'>
                  {address.data.name} - {address.data.phone}
                </p>
              </div>
            </Modal>
          )}
        </section>
      ) : null}
    </main>
  );
};

export default AddressView;
