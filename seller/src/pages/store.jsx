import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TextInput,
  TextArea,
  ModalWrapper,
  Loading,
  Button,
  InlineNotification,
} from '@carbon/react';
import { Add, Store as StoreIcon } from '@carbon/icons-react';
import {
  useChangeDesc,
  useChangeName,
  useCheckDuplicateName,
  useDeleteStore,
  useGetStore,
} from '../features/store/store.queries';
import { Formik, Form } from 'formik';
import {
  changeDescSchema,
  changeNameSchema,
  withDescription,
  withName,
} from '../features/store';

const INITIAL_CHECK_CONTROLLER = {
  isTaken: true,
  message: '',
  isOpen: false,
  edit: false,
};

const Store = () => {
  const [confirmation, setConfirmation] = useState({
    value: '',
    blur: false,
  });
  const [checkNameController, setCheckNameController] = useState(
    INITIAL_CHECK_CONTROLLER
  );

  const storeInfo = useGetStore();
  const checkDuplicateName = useCheckDuplicateName();
  const changeName = useChangeName();
  const changeDesc = useChangeDesc();
  const storeDelete = useDeleteStore();

  // console.log('Store', storeInfo);

  const showChangeName = () => {
    setCheckNameController((prev) => ({
      ...prev,
      edit: true,
    }));
  };

  const hideChangeName = () => {
    setCheckNameController(INITIAL_CHECK_CONTROLLER);
  };

  const handlerCheckName = async (values) => {
    try {
      // TODO: Refactor this piece of shit. Reducer?
      if (values.name === storeInfo.data.name) {
        setCheckNameController((prev) => ({
          ...prev,
          isTaken: true,
          edit: true,
          isOpen: true,
          message: 'Name is the same',
        }));

        return true;
      } else {
        const response = await checkDuplicateName.mutateAsync(values);

        // console.log(response);
        if (response.isTaken) {
          setCheckNameController((prev) => ({
            ...prev,
            edit: true,
            isOpen: true,
            isTaken: true,
            ...response,
          }));

          return true;
        } else {
          setCheckNameController((prev) => ({
            ...prev,
            edit: true,
            isOpen: true,
            ...response,
          }));

          return false;
        }
      }
    } catch (error) {
      console.log('Check Name', error);
    }
  };

  const handlerDeleteStore = async () => {
    try {
      if (confirmation.value === storeInfo.data?.name) {
        await storeDelete.mutateAsync();
      } else {
        setConfirmation((prev) => ({
          ...prev,
          blur: true,
        }));
      }
    } catch (error) {
      console.log('Delete Store', error);
    }
  };

  return (
    <main className='overflow-auto bg-gray-200'>
      <section className='border-b border-gray-200 bg-white px-4 pb-4 pt-3'>
        <h1 className='text-3xl leading-none'>Store</h1>
      </section>
      {storeInfo.isFetched && !storeInfo.data ? (
        <section className='bg-transparent px-4 py-12 text-center'>
          <StoreIcon className='mx-auto h-12 w-12 text-gray-400' />
          <h3 className='mt-2 text-sm font-semibold text-gray-900'>
            You dont have a Store yet
          </h3>
          <p className='mt-1 text-sm text-gray-500'>
            Get started by creating a new one
          </p>
          <div className='mt-6'>
            <Link
              to='create'
              className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300'
            >
              <Add size='24' className='-ml-1 mr-1' />
              Create Store
            </Link>
          </div>
        </section>
      ) : null}

      {storeInfo.isFetched && storeInfo.data ? (
        <section className='space-y-6 px-4 py-2'>
          <div>
            <h2 className='mb-1 text-xl'>Information</h2>
            <Formik
              initialValues={withName(storeInfo.data)}
              validationSchema={changeNameSchema}
              onSubmit={async (values) => {
                try {
                  const taken = await handlerCheckName(values);

                  if (!taken) {
                    setCheckNameController(INITIAL_CHECK_CONTROLLER);
                    await changeName.mutateAsync(values);
                  }
                } catch (error) {
                  console.log('onSumit', error);
                }
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <TextInput
                    id='product-name'
                    name='name'
                    labelText='Name'
                    type='text'
                    placeholder='Name'
                    size='md'
                    invalidText={errors.name}
                    invalid={errors.name && touched.name}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {checkNameController.isOpen && checkNameController.edit && (
                    <div className='my-2'>
                      <InlineNotification
                        kind={checkNameController.isTaken ? 'error' : 'success'}
                        subtitle={checkNameController.message}
                        style={{ maxWidth: '100%' }}
                      />
                    </div>
                  )}

                  {checkNameController.edit ? (
                    <div className='mt-2 flex gap-x-px'>
                      <Button
                        kind='secondary'
                        size='md'
                        type='button'
                        onClick={() => hideChangeName()}
                        style={{ flex: 1 }}
                      >
                        Cancel
                      </Button>
                      <Button
                        kind='secondary'
                        size='md'
                        type='button'
                        onClick={() => handlerCheckName(values)}
                        style={{ flex: 1 }}
                      >
                        Check
                      </Button>
                      <Button
                        kind='primary'
                        size='md'
                        type='submit'
                        style={{ flex: 1 }}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div className='mt-2'>
                      <Button
                        kind='primary'
                        size='md'
                        type='button'
                        onClick={() => showChangeName()}
                      >
                        Change name
                      </Button>
                    </div>
                  )}
                </Form>
              )}
            </Formik>

            <Formik
              initialValues={withDescription(storeInfo.data)}
              validationSchema={changeDescSchema}
              onSubmit={async (values) => {
                try {
                  if (values.description) await changeDesc.mutateAsync(values);
                } catch (error) {
                  console.log('Store');
                  console.log('Description onSubmit', error);
                }
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form className='my-4'>
                  <TextArea
                    id='product-description'
                    name='description'
                    labelText='Description'
                    type='text'
                    placeholder='Some util description'
                    size='xl'
                    enableCounter={true}
                    maxCount={255}
                    value={values.description}
                    invalidText={errors.description}
                    invalid={errors.description && touched.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <div className='mt-2'>
                    <Button kind='primary' size='md' type='submit'>
                      Change description
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <section className='space-y-4 '>
            <div>
              <h2 className='mb-2 text-xl'>Verification</h2>
              {/* TODO: Si ya enviaste el formulariom de verificacion, mostrar feedback */}
              {storeInfo.data?.official ? (
                <div>Your Store is verified</div>
              ) : (
                <div>
                  <p className='text-sm text-gray-500'>
                    Your Store is not verified.
                  </p>
                  <p className='text-sm text-gray-500'>
                    Send us a request to verify.
                  </p>
                  <Link to='#' className='text-sm text-blue-600'>
                    Fill out the form
                  </Link>
                </div>
              )}
            </div>
            <div>
              <h2 className='mb-2 text-xl'>Delete Store</h2>
              <p className='mb-3 text-sm text-gray-500'>
                No longer want to use our service? You can delete your store
                here. This action is not reversible. All information related to
                this store will be deleted permanently.
              </p>
              <Loading active={storeDelete.isLoading} />

              <ModalWrapper
                buttonTriggerText='Delete Store'
                triggerButtonKind='danger'
                modalLabel={`Delete ${storeInfo.data?.name}`}
                modalHeading='Confirm Delete Store'
                primaryButtonText='Delete'
                handleSubmit={handlerDeleteStore}
                shouldCloseAfterSubmit={false}
                danger
                size='md'
              >
                <div>
                  <p className='text-gray-600'>
                    Deleting your store will remove all information related to
                    it. This action cannot be undone.
                  </p>
                  <div className='mt-6'>
                    <TextInput
                      id='store-confirmation-name'
                      type='text'
                      labelText={
                        <p className='text-xs text-gray-500'>
                          Type{' '}
                          <strong className='text-gray-600'>
                            {storeInfo.data?.name}
                          </strong>{' '}
                          to confirm
                        </p>
                      }
                      onChange={(e) =>
                        setConfirmation((prev) => ({
                          ...prev,
                          value: e.target.value,
                        }))
                      }
                      onBlur={() =>
                        setConfirmation((prev) => ({ ...prev, blur: true }))
                      }
                      placeholder='Type the name'
                      helperText='This action cannot be undone'
                      invalidText='The name does not match'
                      invalid={
                        confirmation.blur &&
                        confirmation.value !== storeInfo.data?.name
                      }
                      warnText='You are about to delete your store!'
                      warn={
                        confirmation.blur &&
                        confirmation.value === storeInfo.data?.name
                      }
                    />
                  </div>
                </div>
              </ModalWrapper>
            </div>
            <div>
              <h2 className='mb-2 text-xl'>Acerca de</h2>
              <div>
                <p className='text-sm text-gray-500'>
                  Created At{' '}
                  {storeInfo.data?.createdAt || new Date().toISOString()}
                </p>
                <p className='text-sm text-gray-500'>
                  Last Updated At{' '}
                  {storeInfo.data?.createdAt || new Date().toISOString()}
                </p>
              </div>
            </div>
          </section>
        </section>
      ) : null}
    </main>
  );
};

export default Store;
