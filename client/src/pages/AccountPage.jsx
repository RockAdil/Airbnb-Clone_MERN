import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link, Navigate } from 'react-router-dom';

export const AccountPage = () => {
  const { ready, user } = useContext(UserContext);

  if (!ready) {
    return 'loading';
  }

  if (ready && !user) {
    <Navigate to={'/login'} />;
  }

  return (
    <div>
      <nav className='w-full flex justify-center mt-8 gap-2'>
        <Link
          className='px-6 py-2 bg-primary text-white rounded-full'
          to={'/account'}
        >
          My profile
        </Link>
        <Link className='px-6 py-2' to={'/account/bookings'}>
          My bookings
        </Link>
        <Link className='px-6 py-2' to={'/account/places'}>
          My places
        </Link>
      </nav>
    </div>
  );
};
