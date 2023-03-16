import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import * as Product from '..';
import { FieldText } from '../../ui/form';

const ProductAnswer = ({ QAs }) => {
  const onSubmit = async (values) => {
    try {
      console.log('Search QA', values);
    } catch (error) {
      console.log('Product QAs', error);
    }
  };

  return (
    <div>
      <p className='text-sm text-gray-500'>
        Puedes buscar preguntas y respuestas previas que hayan hecho otros
        usuarios. Esto te puede ayudar a encontrar la respuesta que necesitas de
        forma rápida y sencilla.
      </p>
      <Formik
        initialValues={Product.Formik.searchInitial}
        validationSchema={Product.Formik.searchSchema}
        onSubmit={onSubmit}
      >
        <Form className='mt-2'>
          <div className='mt-2 flex items-center gap-x-2'>
            <div className='w-full'>
              <FieldText
                name='search'
                placeholder='Escribí una pregunta o palabra clave...'
              />
            </div>
            <button
              type='submit'
              className='rounded-md bg-indigo-600 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
            >
              {/* <magnifying-glass */}
              <MagnifyingGlassIcon className='h-7 w-6' />
            </button>
          </div>
        </Form>
      </Formik>
      {/* Answers */}
      <div className='mt-4'>
        {!QAs && <h4>Cargando...</h4>}
        {QAs?.length === 0 && <h4 className=''>Sé el primero en preguntar</h4>}

        {QAs?.length > 0 && (
          <div>
            <h3 className='text-lg'>Últimas realizadas</h3>
            <div className='mt-2 space-y-3'>
              {QAs.map((qa) => (
                <Product.QAItem qa={qa} key={qa.id} />
              ))}
              {QAs.map((qa) => (
                <Product.QAItem qa={qa} key={qa.id} />
              ))}
              {QAs.map((qa) => (
                <Product.QAItem qa={qa} key={qa.id} />
              ))}
              {QAs.map((qa) => (
                <Product.QAItem qa={qa} key={qa.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductAnswer;
