import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import ProductAnswer from './product-answer';
import ProductQuestion from './product-question';

const ProductQA = ({ QAs }) => {
  return (
    <Tab.Group>
      <Tab.List className='grid grid-cols-2 border-b border-gray-200'>
        <Tab
          className={({ selected }) =>
            clsx(
              selected && 'border-blue-600 font-semibold text-blue-600',
              'border-b-2 border-transparent p-2 text-left text-gray-500 hover:text-blue-600',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            )
          }
        >
          Look for an answer
        </Tab>
        <Tab
          className={({ selected }) =>
            clsx(
              selected && 'border-blue-600 font-semibold text-blue-600',
              'border-b-2 border-transparent p-2 text-left text-gray-500 hover:text-blue-600',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            )
          }
        >
          Make a Question
        </Tab>
      </Tab.List>
      <Tab.Panels className='py-2'>
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
