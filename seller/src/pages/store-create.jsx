import { Button, Loading, TextArea, TextInput } from '@carbon/react';
import { Form, Formik } from 'formik';
import {
  initialValues,
  useCreateStore,
  validationSchema,
} from '../features/store';
import { nonEmptyValues } from '../utils/form/non-empty-values';
import { useNavigate } from 'react-router-dom';

const StoreCreate = () => {
  const store = useCreateStore();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const clearValues = nonEmptyValues(values);

      await store.mutateAsync(clearValues);
      navigate('/store');
    } catch (error) {
      console.log('StoreCreate', error);
    }
  };

  return (
    <main className='overflow-auto bg-gray-200'>
      <section className='border-b border-gray-200 bg-white px-4 pb-4 pt-3'>
        <h1 className='text-3xl leading-none'>Create Store</h1>
      </section>

      <Loading active={store.isLoading} />

      <section className='my-4 px-4'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className='w-full'>
              <div>
                <div>
                  <h2 className='mb-2 text-xl'>Store information</h2>
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
                </div>
                <div className='mt-6'>
                  <Button kind='primary' type='submit'>
                    Create store
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export default StoreCreate;
