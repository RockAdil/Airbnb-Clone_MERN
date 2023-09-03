import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout = () => {
  return (
    <div className='py-6 px-14 flex flex-col min-h-screen'>
      <Header />
      <Outlet />
    </div>
  );
};
