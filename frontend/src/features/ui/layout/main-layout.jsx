import { Outlet } from 'react-router-dom';
import Footer from '../footer';
import Header from '../../header';

const MainLayout = () => {
  return (
    <>
      <div className='grid min-h-screen grid-rows-[auto_1fr]'>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
