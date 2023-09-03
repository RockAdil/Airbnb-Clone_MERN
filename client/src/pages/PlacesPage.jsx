import { Link } from 'react-router-dom';
import { AccountNav } from '../AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className='text-center'>
        <Link
          to={'/account/places/new'}
          className='inline-flex bg-primary text-white px-6 py-2 rounded-full gap-1 '
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
          Add new places
        </Link>
      </div>
      <div className='mt-10 flex flex-col gap-4'>
        {places.length > 0 &&
          places.map((place, index) => (
            <Link
              to={'/account/places/' + place._id}
              key={index}
              className='flex gap-4 bg-zinc-100 p-4 rounded-xl shadow-md shadow-gray-300  cursor-pointer'
            >
              <div className='flex bg-slate-300 shrink-0 rounded-md'>
                {place.photos && (
                  <img
                    className='object-cover rounded-md w-60 h-auto'
                    src={'http://127.0.0.1:3000/uploads/' + place.photos[0]}
                    alt={place.title}
                  />
                )}
              </div>
              <div className='flex-col'>
                <h2 className='text-xl font-medium'>{place.title}</h2>
                <p className='text-sm mt-2'>{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
