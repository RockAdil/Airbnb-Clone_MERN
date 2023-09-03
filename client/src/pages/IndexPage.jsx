import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className='mt-12 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
      {places.length &&
        places.map((place, index) => (
          <Link to={'/place/' + place._id} key={index}>
            <div className=''>
              {place.photos?.[0] && (
                <img
                  className='rounded-2xl object-cover aspect-square'
                  src={'http://127.0.0.1:3000/uploads/' + place.photos[0]}
                  alt={place.title}
                />
              )}
            </div>
            <div className='mt-4'>
              <h3 className='font-bold'>{place.address}</h3>
              <h2 className='text-sm text-gray-500'>{place.title}</h2>
              <p className='mt-1'>
                <span className='font-semibold'>&#36;{place.price}</span> per
                night
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};
