import { Outlet } from 'react-router-dom';
import Footer from '../footer';
import Header from '../../header';
import { CommandPalette } from '..';

const MainLayout = () => {
  return (
    <>
      <CommandPalette />
      <div className='grid min-h-screen grid-rows-[auto_1fr]'>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
