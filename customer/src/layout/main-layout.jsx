import { Fragment, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import {
  // IconButton,
  HeaderContainer,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderPanel,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  Theme,
  Search,
} from '@carbon/react';
import {
  Search as SearchIcon,
  UserAvatar,
  Switcher,
} from '@carbon/icons-react';

const MENU_ITEMS = [
  {
    href: '#',
    linkText: 'Link 1',
  },
  {
    href: '#',
    linkText: 'Link 2',
  },
  {
    href: '#',
    linkText: 'Link 3',
  },
];
const SHORTCUTS = ['K', 'k'];

export const MainLayout = () => {
  const [commandPalette, setSommandPalette] = useState(false);
  const { q } = useParams();
  const [search, setSearch] = useState(q || '');

  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const handleKeydown = (event) => {
      if (SHORTCUTS.includes(event.key) && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setSommandPalette((curr) => !curr);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <div className='grid min-h-screen grid-rows-[auto_1fr]'>
      <Theme>
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <Header
              aria-label='Fak-Ommerce for Customers'
              style={{ position: 'static' }}
            >
              <HeaderMenuButton
                aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
                aria-expanded={isSideNavExpanded}
              />
              <HeaderName
                href='/'
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
                prefix=''
              >
                <div className='flex flex-col'>
                  <h2 className='text-sm leading-snug'>Fak-Ommerce</h2>
                  <h3 className='text-sm leading-none'>[ Customer ]</h3>
                </div>
              </HeaderName>
              <HeaderNavigation aria-label='Fak-Ommerce [Customer]'>
                {MENU_ITEMS.map((item) => (
                  <HeaderMenuItem key={item.linkText} href={item.href}>
                    {item.linkText}
                  </HeaderMenuItem>
                ))}
                <HeaderMenu aria-label='Link 4' menuLinkName='Link 4'>
                  <HeaderMenuItem href='#'>Sub-link 1</HeaderMenuItem>
                  <HeaderMenuItem href='#'>Sub-link 2</HeaderMenuItem>
                  <HeaderMenuItem href='#'>Sub-link 3</HeaderMenuItem>
                </HeaderMenu>
              </HeaderNavigation>
              <HeaderGlobalBar>
                <HeaderGlobalAction
                  aria-label='Search'
                  onClick={() => setSommandPalette(false)}
                >
                  <SearchIcon />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label='Account' onClick={() => {}}>
                  <UserAvatar />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label='App Switcher'
                  onClick={() => {}}
                >
                  <Switcher />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
              <SideNav
                aria-label='Side navigation'
                expanded={isSideNavExpanded}
                isPersistent={false}
                onSideNavBlur={onClickSideNavExpand}
              >
                <SideNavItems>
                  <HeaderSideNavItems>
                    <HeaderMenuItem href='#'>Link 1</HeaderMenuItem>
                    <HeaderMenuItem href='#'>Link 2</HeaderMenuItem>
                    <HeaderMenuItem href='#'>Link 3</HeaderMenuItem>
                    <HeaderMenu aria-label='Link 4' menuLinkName='Link 4'>
                      <HeaderMenuItem href='#'>Sub-link 1</HeaderMenuItem>
                      <HeaderMenuItem isActive href='#'>
                        Sub-link 2
                      </HeaderMenuItem>
                      <HeaderMenuItem href='#'>Sub-link 3</HeaderMenuItem>
                    </HeaderMenu>
                  </HeaderSideNavItems>
                </SideNavItems>
              </SideNav>
              {/* <HeaderPanel aria-label='Header Panel' /> */}
            </Header>
          )}
        />
        <Transition.Root
          show={commandPalette}
          as={Fragment}
          afterLeave={() => {
            setSearch('');
          }}
        >
          <Dialog
            className='fixed inset-0 overflow-y-auto'
            onClose={setSommandPalette}
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
              <Dialog.Overlay className='fixed inset-0 bg-black/50' />
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
              <div>
                <div className='border-b border-gray-200 bg-white p-4'>
                  <h2 className='text-xl leading-none'>Search Products</h2>
                </div>
                <Search
                  id='command-palette-search'
                  labelText='Search'
                  placeholder='What are you looking for?'
                  size='lg'
                  className='bg-white'
                  onChange={handleSearch}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && search.length >= 2) {
                      navigate(`/${search}`);
                      setSommandPalette(false);
                    }
                  }}
                  value={search}
                />
                {/* <section>
                  <ul className='divide-y-2 divide-gray-200 bg-gray-100'>
                    {products.isFetched &&
                      products.data?.rows.map((product, index) => (
                        <li key={index}>
                          <Link to={`/:${debouncedSearch}`}>
                            <div className='flex px-4 py-3 items-center'>
                              <SearchIcon className='mr-4' />
                              <h3 className='text-sm text-black'>
                                {product.name}
                              </h3>
                            </div>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </section> */}
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
      </Theme>
      <Outlet />
    </div>
  );
};
