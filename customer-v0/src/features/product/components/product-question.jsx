import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Textarea } from '../../ui/form';
import * as Product from '..';

const ProductQuestion = () => {
  const [query, setQuery] = useState('');

  const onSubmit = async (values) => {
    try {
      console.log('Product Question', values);
    } catch (error) {
      console.log('Product Question', error);
    }
  };

  return (
    <div>
      <p className='text-sm text-gray-500'>
        Si no encuentraste la respuesta que buscas, no te preocupes. Puedes
        hacer tu propia pregunta aqui. Por favor, sé lo más específico posible.
      </p>
      <Formik
        initialValues={Product.Formik.questionInitial}
        validationSchema={Product.Formik.questionSchema}
        onSubmit={onSubmit}
      >
        <Form className='mt-2'>
          <Textarea name='question' placeholder='Tu pregunta' />
          <div className='mt-2 flex'>
            <button
              type='submit'
              className='ml-auto rounded-md bg-indigo-600 py-2 px-3 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
            >
              Send question
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ProductQuestion;
