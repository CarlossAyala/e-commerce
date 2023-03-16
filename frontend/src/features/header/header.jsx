import { useState } from 'react';
import {
  Bars3BottomRightIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Slideover } from '../ui';
import Logo from '../ui/logo';
import ButtonIcon from './components/button-icon';
import CartHeader from './components/cart-header';
import CartSlider from './components/cart-slider';
import MobileSlider from './components/mobile-slider';
import Navigation from './components/navigation';
import SignInUp from './components/sign-in-up';
import { useAuth } from '../auth';
import { Link } from 'react-router-dom';

const Header = () => {
  const [toggleCart, setToggleCart] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [, user] = useAuth();

  const hello = () => console.log('Hola');
  return (
    <div>
      {!user && (
        <div className='flex items-center justify-end bg-indigo-600 text-sm text-white lg:hidden'>
          <Link to='signin' className='p-2 text-sm font-medium'>
            Sign in
          </Link>
          <Link to='signup' className='p-2 text-sm font-medium'>
            Create account
          </Link>
        </div>
      )}
      <header className='mx-auto w-full max-w-7xl border-b border-gray-200 bg-white px-4'>
        <div className='flex items-center justify-between py-3'>
          <div className='flex items-center lg:gap-x-4'>
            <Logo />
            <Navigation />
          </div>
          <div className='-mr-2 flex items-center gap-x-2 lg:mr-0'>
            {/* Signin and Signup */}
            {!user && <SignInUp />}

            {/* Search Products */}
            <ButtonIcon
              label='Search Product'
              icon={MagnifyingGlassIcon}
              onClick={hello}
            />

            {/* Shopping Cart */}
            <CartHeader onClick={() => setToggleCart(true)} />
            <Slideover
              open={toggleCart}
              setOpen={setToggleCart}
              title='Shopping Cart'
            >
              <CartSlider />
            </Slideover>

            {/* Icon User */}
            {user && (
              <div className='hidden lg:block'>
                <ButtonIcon
                  label='Account'
                  icon={UserCircleIcon}
                  onClick={hello}
                />
              </div>
            )}

            {/* Icon Burger */}
            <div className='lg:hidden'>
              <ButtonIcon
                label='Open sidebar'
                icon={Bars3BottomRightIcon}
                onClick={() => setToggleMenu(true)}
              />
            </div>
            <Slideover
              title='Menu'
              size='xs'
              open={toggleMenu}
              setOpen={setToggleMenu}
            >
              <MobileSlider onClick={() => setToggleMenu(false)} />
            </Slideover>
          </div>
          {/* Proximanete - Sub Nav */}
        </div>
      </header>
    </div>
  );
};

export default Header;
