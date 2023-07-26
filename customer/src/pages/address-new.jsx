import { Form, Formik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  initialValues,
  useCreateAddress,
  validationSchema,
} from '../features/address';
import { Button, TextArea, TextInput } from '@carbon/react';
import { nonEmptyValues } from '../../../seller/src/utils/form/non-empty-values';

const AddressNew = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const createAddress = useCreateAddress();

  console.log('AddressNew location', location);

  const handleSubmit = async (values) => {
    try {
      console.log('Values', values);
      const cleaned = nonEmptyValues(values);
      console.log('Cleaned Values', cleaned);
      const newAddress = await createAddress.mutateAsync(cleaned);
      console.log('New Address', newAddress);

      const from =
        location.state?.from || `/account/address/${newAddress.id}/view`;
      navigate(from, {
        state: {
          addressId: newAddress.id,
        },
      });
    } catch (error) {
      console.log('AddressNew');
      console.log('handleSubmit', error);
    }
  };

  return (
    <main className='flex w-full flex-col bg-white'>
      <section className='border-b border-gray-200 px-4 pb-4 pt-3'>
        <h1 className='text-2xl leading-none'>Address</h1>
        <h2 className='mt-1 text-base leading-none tracking-wide text-gray-600'>
          New
        </h2>
      </section>

      <section className='px-4 py-2'>
        <h3 className='text-xl font-semibold text-gray-900'>Add an address</h3>
        <p className='text-sm text-gray-800'>
          Serán usadas como destino de envío.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className='mt-4'>
              <div className='space-y-4'>
                <TextInput
                  id='address-name'
                  name='name'
                  labelText='Full name'
                  placeholder='Your full name'
                  invalidText={errors.name}
                  invalid={errors.name && touched.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <TextInput
                  id='address-phone'
                  name='phone'
                  labelText='Phone'
                  placeholder='Your phone number'
                  invalidText={errors.phone}
                  invalid={errors.phone && touched.phone}
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextInput
                  id='address-zip-code'
                  name='zipCode'
                  labelText='Zip code'
                  placeholder='Zip code'
                  invalidText={errors.zipCode}
                  invalid={errors.zipCode && touched.zipCode}
                  value={values.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextInput
                  id='address-province'
                  name='province'
                  labelText='Province'
                  placeholder='Your province'
                  invalidText={errors.province}
                  invalid={errors.province && touched.province}
                  value={values.province}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextInput
                  id='address-city'
                  name='city'
                  labelText='City'
                  placeholder='Your city'
                  invalidText={errors.city}
                  invalid={errors.city && touched.city}
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextInput
                  id='address-street'
                  name='street'
                  labelText='Street'
                  placeholder='Street'
                  invalidText={errors.street}
                  invalid={errors.street && touched.street}
                  value={values.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextInput
                  id='address-apartment-number'
                  name='apartmentNumber'
                  labelText='Apartment number'
                  placeholder='Apartment number'
                  invalidText={errors.apartmentNumber}
                  invalid={errors.apartmentNumber && touched.apartmentNumber}
                  value={values.apartmentNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextArea
                  id='address-aditional'
                  name='aditional'
                  labelText='Aditional information'
                  placeholder='Aditional information'
                  maxCount={255}
                  enableCounter={true}
                  invalidText={errors.aditional}
                  invalid={errors.aditional && touched.aditional}
                  value={values.aditional}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className='mt-8 flex justify-end gap-x-px'>
                <Link to='/account/address/list'>
                  <Button type='button' kind='secondary' size='lg'>
                    Cancel
                  </Button>
                </Link>
                <Button type='submit' kind='primary' size='lg'>
                  Create
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export default AddressNew;
