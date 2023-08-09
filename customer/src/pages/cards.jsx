import { Fragment, useState } from 'react';
import { Button, SkeletonText } from '@carbon/react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import {
  useGetPaymentMethod,
  useGetPaymentMethods,
  useRemovePaymentMethod,
} from '../features/payment-method';

const CardSkeleton = () => {
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

const Cards = () => {
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [modal, setModal] = useState(false);

  const card = useGetPaymentMethod(paymentMethodId);
  const cards = useGetPaymentMethods();
  const remove = useRemovePaymentMethod();

  // console.log('Card', card);
  // console.log('Cards', cards);

  const handleOpenModal = (id) => {
    setPaymentMethodId(id);
    setModal(true);
  };

  const handleRemove = async () => {
    setPaymentMethodId(null);

    try {
      await remove.mutateAsync(paymentMethodId);
    } catch (error) {
      console.log('<Cards />');
      console.log('handleRemove', error);
    } finally {
      setModal(false);
    }
  };

  return (
    <main className='flex w-full flex-col overflow-auto bg-white'>
      <section className='border-b border-gray-200 px-4 py-2'>
        <h1 className='text-xl font-medium leading-none'>Account</h1>
        <h2 className='text-base font-medium leading-snug text-gray-500'>
          Cards
        </h2>
      </section>

      {cards.isLoading ? (
        <section className='p-4'>
          <div className='w-1/4'>
            <SkeletonText />
          </div>
          <SkeletonText width='100%' />
          <div className='mt-3 space-y-4'>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </section>
      ) : (
        <section>
          {cards.isSuccess && cards.data.length === 0 ? (
            <div className='p-4'>
              <h3 className='text-lg font-semibold leading-normal text-black'>
                You don&apos;t have any credit card.
              </h3>
              <p className='text-sm leading-none text-gray-600'>
                When you make a purchase, you&apos;ll see those cards here.
              </p>
            </div>
          ) : null}

          {cards.isSuccess && cards.data.length > 0 ? (
            <div className='px-4 py-3'>
              <h3 className='text-base font-semibold leading-tight text-black'>
                Cards
              </h3>
              <p className='text-sm text-gray-600'>
                When you make a purchase, you&apos;ll see those cards here.
              </p>

              <ul className='mt-4 space-y-4'>
                {cards.data.map((card) => (
                  <li key={card.id} className='flex bg-gray-100 shadow'>
                    <div className='grow px-4 py-3'>
                      <p className='text-lg font-medium capitalize leading-normal text-black'>
                        {card.card.brand}
                      </p>
                      <p className='mt-1 text-sm text-gray-800'>
                        Finished on {card.card.last4}
                      </p>
                      <p className='text-sm text-gray-600'>
                        Expires on {card.card.exp_month}/{card.card.exp_year}
                      </p>
                    </div>
                    <div className='shrink-0'>
                      <Button
                        kind='ghost'
                        size='lg'
                        onClick={() => handleOpenModal(card.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>

              <Transition.Root
                show={modal}
                as={Fragment}
                afterLeave={() => setPaymentMethodId(null)}
              >
                <Dialog as='div' className='relative z-10' onClose={setModal}>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='fixed inset-0 bg-black/50' />
                  </Transition.Child>

                  <div className='fixed inset-0 z-10 overflow-y-auto'>
                    <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                      <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                      >
                        <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                          <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                            <div className='sm:flex sm:items-start'>
                              <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                                <ExclamationTriangleIcon
                                  className='h-6 w-6 text-red-600'
                                  aria-hidden='true'
                                />
                              </div>
                              <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                                <Dialog.Title
                                  as='h3'
                                  className='text-base font-semibold leading-6 text-gray-900'
                                >
                                  Remove card
                                </Dialog.Title>
                                <div className='mt-2'>
                                  <p className='text-sm text-gray-600'>
                                    Are you sure you want to delete this card?
                                    This will be permanently removed. This
                                    action cannot be undone.
                                  </p>
                                </div>
                                <div className='mt-4'>
                                  <h4 className='text-base font-semibold leading-6 text-gray-900'>
                                    Card information
                                  </h4>
                                  {card.isLoading && !card.data ? (
                                    <div className='mt-2'>
                                      <CardSkeleton />
                                    </div>
                                  ) : (
                                    <div className='mt-2 bg-gray-100 px-4 py-2 text-left'>
                                      <p className='text-lg font-bold capitalize leading-normal text-black'>
                                        {card.data.card.brand}
                                      </p>
                                      <p className='mt-1 text-sm text-gray-800'>
                                        Finished on {card.data.card.last4}
                                      </p>
                                      <p className='text-sm text-gray-600'>
                                        Expires on {card.data.card.exp_month}/
                                        {card.data.card.exp_year}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                            <button
                              type='button'
                              className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                              onClick={handleRemove}
                            >
                              Delete
                            </button>
                            <button
                              type='button'
                              className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                              onClick={() => setModal(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            </div>
          ) : null}
        </section>
      )}
    </main>
  );
};

export default Cards;
