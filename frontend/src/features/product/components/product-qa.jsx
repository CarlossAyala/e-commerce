import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import ProductAnswer from './product-answer';
import ProductQuestion from './product-question';

const ProductQA = ({ QAs }) => {
  return (
    <Tab.Group>
      <Tab.List className='grid grid-cols-2 gap-x-2'>
        <Tab
          className={({ selected }) =>
            clsx(
              'border-b-2 py-1.5 text-left ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              selected
                ? 'border-blue-600 font-semibold text-blue-600'
                : 'border-gray-200 text-gray-600'
            )
          }
        >
          Look for an answer
        </Tab>
        <Tab
          className={({ selected }) =>
            clsx(
              'border-b-2 py-1.5 text-left ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              selected
                ? 'border-blue-600 font-semibold text-blue-600'
                : 'border-gray-200 text-gray-600'
            )
          }
        >
          Make a Question
        </Tab>
      </Tab.List>
      <Tab.Panels className='mt-3'>
        <Tab.Panel>
          <ProductAnswer QAs={QAs} />
        </Tab.Panel>
        <Tab.Panel>
          <ProductQuestion />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default ProductQA;
