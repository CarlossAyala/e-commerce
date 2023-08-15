import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, TextArea, TextInput } from '@carbon/react';
import { storeInitial, useNewStore, storeSchema } from '../features/store';

const StoreNew = () => {
  const newStore = useNewStore();
  const navigate = useNavigate();

  const handleNewStore = async (values) => {
    try {
      await newStore.mutateAsync(values);
      navigate('/store');
    } catch (error) {
      console.log('<StoreNew />', error);
    }
  };

  return (
    <main className='flex w-full flex-col overflow-auto bg-white'>
      <section className='px-4 pt-3'>
        <h1 className='text-base font-semibold leading-6 text-gray-900'>
          Create Store
        </h1>
        <p className='mt-1 text-sm text-gray-600'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae
          tenetur veniam accusamus.
        </p>
      </section>

      <section className='p-4'>
        <Formik
          initialValues={storeInitial}
          validationSchema={storeSchema}
          onSubmit={handleNewStore}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className='w-full'>
              <div className='space-y-4'>
                <TextInput
                  id='store-name'
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
                <TextArea
                  id='store-description'
                  name='description'
                  labelText='Description'
                  type='text'
                  placeholder='Description'
                  size='xl'
                  enableCounter={true}
                  maxCount={255}
                  invalidText={errors.description}
                  invalid={errors.description && touched.description}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className='mt-6'>
                <Button kind='primary' type='submit'>
                  Create store
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export default StoreNew;
