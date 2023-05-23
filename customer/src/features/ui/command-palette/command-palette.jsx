import { Fragment, useEffect, useState } from 'react';
import { Dialog, Combobox, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx ';

const SHORTCUT = ['K', 'k'];
const fake = [...Array(100)].map((item, index) => ++index);

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = query ? fake.filter((item) => item >= +query) : [];

  useEffect(() => {
    const handleKeydown = (event) => {
      if (SHORTCUT.includes(event.key) && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setOpen((curr) => !curr);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => {
        setQuery('');
      }}
    >
      <Dialog
        className='fixed inset-0 overflow-y-auto p-4 pt-[10vh]'
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 bg-gray-500/75' />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Combobox
            as='div'
            className='relative mx-auto max-w-xl divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-xl ring-2 ring-black/10'
            onChange={(value) => {
              console.log(value);
              setOpen(false);
            }}
          >
            <div className='flex items-center space-x-1 px-4'>
              <MagnifyingGlassIcon className='h-6 w-6 text-gray-500' />
              <Combobox.Input
                className='h-12 w-full border-0 bg-transparent text-gray-800 placeholder-gray-400 focus:ring-0'
                placeholder='Search...'
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
              />
            </div>
            {filtered.length > 0 && (
              <Combobox.Options
                className='h-full max-h-60 overflow-y-auto py-2 text-sm'
                static
              >
                {filtered.map((item) => (
                  <Combobox.Option key={item} value={item}>
                    {({ active }) => (
                      <div
                        className={clsx(
                          'px-4 py-2',
                          active ? 'bg-gray-200' : 'bg-white text-gray-900'
                        )}
                      >
                        Index {item}
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query && filtered.length === 0 && (
              <p className='p-4 text-sm text-gray-500'>No results found.</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default CommandPalette;
