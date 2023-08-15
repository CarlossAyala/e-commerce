import { TextInput, TextArea, Button } from '@carbon/react';
import {
  useChangeDescription,
  useChangeName,
  useDeleteStore,
  useGetStore,
  changeDescriptionSchema,
  changeNameSchema,
  storeDescriptionDefault,
  storeNameDefault,
} from '../features/store';
import { Formik, Form } from 'formik';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const Store = () => {
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const store = useGetStore();
  const changeName = useChangeName();
  const changeDescription = useChangeDescription();
  const deleteStore = useDeleteStore();

  const handleChangeName = async (values, { setFieldError }) => {
    try {
      await changeName.mutateAsync(values);
    } catch (error) {
      if (error.response) {
        setFieldError('name', error.response.data.message);
      }
      console.log('<Store />');
      console.log('handleChangeName', error);
    }
  };

  const handleChangeDescription = async (values) => {
    try {
      await changeDescription.mutateAsync(values);
    } catch (error) {
      console.log('<Store />');
      console.log('handleChangeDescription', error);
    }
  };

  const handleDeleteStore = async () => {
    try {
      await deleteStore.mutateAsync();
      navigate('/dashboard');
    } catch (error) {
      console.log('<Store />');
      console.log('handleDeleteStore', error);
    }
  };

  return (
    <main className='flex w-full flex-col space-y-10 overflow-auto bg-white'>
      {store.isLoading ? (
        <section className='space-y-6'>
          <p>Loading...</p>
        </section>
      ) : (
        <>
          {store.isSuccess && (
            <section className='space-y-6'>
              <div className='p-4'>
                <h2 className='text-base font-semibold'>Store Information</h2>
                <p className='text-sm leading-tight text-gray-600'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur quaerat.
                </p>

                <dl className='mt-4 space-y-3'>
                  <div>
                    <dt className='text-sm font-semibold leading-6 text-gray-900'>
                      Name
                    </dt>
                    <dd className='text-sm leading-6 text-gray-600 sm:col-span-2 sm:mt-0'>
                      {store.data.name}
                    </dd>
                  </div>
                  <div>
                    <dt className='text-sm font-semibold leading-6 text-gray-900'>
                      Description
                    </dt>
                    <dd className='text-sm leading-6 text-gray-600 sm:col-span-2 sm:mt-0'>
                      {store.data.description}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className='p-4'>
                <h2 className='text-base font-semibold'>Change name</h2>
                <p className='text-sm leading-tight text-gray-600'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur quaerat.
                </p>

                <Formik
                  enableReinitialize
                  initialValues={storeNameDefault(store.data)}
                  validationSchema={changeNameSchema}
                  onSubmit={handleChangeName}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                  }) => (
                    <Form className='mt-6 space-y-6'>
                      <TextInput
                        id='store-change-name'
                        name='name'
                        labelText='Name'
                        placeholder='Your store name'
                        size='md'
                        invalid={errors.name && touched.name}
                        invalidText={errors.name}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting || changeName.isLoading}
                      />

                      <Button
                        type='submit'
                        disabled={isSubmitting || changeName.isLoading}
                      >
                        Save
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>

              <div className='p-4'>
                <h2 className='text-base font-semibold'>Change description</h2>
                <p className='text-sm leading-tight text-gray-600'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur quaerat.
                </p>

                <Formik
                  enableReinitialize
                  initialValues={storeDescriptionDefault(store.data)}
                  validationSchema={changeDescriptionSchema}
                  onSubmit={handleChangeDescription}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                  }) => (
                    <Form className='mt-6 space-y-6'>
                      <TextArea
                        id='store-change-description'
                        name='description'
                        labelText='Description'
                        type='text'
                        placeholder='Describe your store'
                        size='xl'
                        enableCounter={true}
                        maxCount={255}
                        invalidText={errors.description}
                        invalid={errors.description && touched.description}
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting || changeDescription.isLoading}
                      />

                      <Button
                        disabled={isSubmitting || changeDescription.isLoading}
                        type='submit'
                      >
                        Save
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>

              <div className='p-4'>
                <h2 className='text-base font-semibold'>Delete store</h2>
                <p className='text-sm leading-tight text-gray-600'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur quaerat.
                </p>

                <div className='mt-6'>
                  <Button
                    type='button'
                    kind='danger'
                    onClick={() => setModal(true)}
                    disabled={deleteStore.isLoading}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              <Transition.Root show={modal} as={Fragment}>
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
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
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
                                  Delete Store
                                </Dialog.Title>
                                <div className='mt-2'>
                                  <p className='text-sm text-gray-500'>
                                    Are you sure you want to delete your Store?
                                    All of your data will be permanently
                                    removed. This action cannot be undone.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                            <button
                              type='button'
                              className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                              onClick={handleDeleteStore}
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
            </section>
          )}
        </>
      )}
    </main>
  );
};

export default Store;
