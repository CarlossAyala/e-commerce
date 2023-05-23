import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link, Outlet } from 'react-router-dom';
import {
  Close,
  Menu,
  Search as SearchIcon,
  Notification,
} from '@carbon/icons-react';
import { IconButton } from '@carbon/react';

const MainLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='grid min-h-screen grid-rows-[auto_1fr]'>
      {/* Right Sidebar */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500 sm:duration-700'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500 sm:duration-700'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='pointer-events-auto relative w-screen max-w-md'>
                    <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                      <div className='flex items-center justify-between border-b border-gray-200 px-4 py-3'>
                        <Dialog.Title className='text-lg text-gray-900'>
                          Panel title
                        </Dialog.Title>
                        <button
                          type='button'
                          className=''
                          onClick={() => setOpen(false)}
                        >
                          <Close size={'32'} />
                        </button>
                      </div>
                      <div className='relative flex-1 px-4'>
                        {/* Your content */}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <header className='flex items-center border-b border-gray-200'>
        {/* Header Name */}
        <Link
          to='/'
          className='flex h-[48px] flex-col items-start justify-center px-4 text-sm leading-tight text-gray-800'
        >
          <div>Fak-Ommerce</div>
          <div>[ Sellers ]</div>
        </Link>
        {/* Header Navegation */}
        {/* Header Global Actions */}
        <div className='ml-auto flex items-center'>
          <IconButton label='Hamburger' kind='ghost' size='lg'>
            <SearchIcon size={24} />
          </IconButton>
          <IconButton label='Hamburger' kind='ghost' size='lg'>
            <Notification size={24} />
          </IconButton>
          <IconButton label='Hamburger' kind='ghost' size='lg'>
            <Menu size={24} />
          </IconButton>
        </div>
      </header>
      {/* Content */}
      <Outlet />
    </div>
  );
};

export default MainLayout;
