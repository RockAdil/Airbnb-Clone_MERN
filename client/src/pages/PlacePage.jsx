import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookingWidget } from '../BookingWidget';
import { PlaceGallery } from '../placeGallery';
import { AddressLink } from '../AddressLink';

export const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then(res => setPlace(res.data));
  }, [id]);

  if (!place) return;

  return (
    <div className='mt-4 bg-gray-100 -mx-14 px-14 pt-8'>
      <h1 className='text-3xl'>{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />

      <div className='mt-10 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]'>
        <div>
          <div className='my-4'>
            <h2 className='text-2xl font-semibold mb-4'>Description</h2>
            <p>{place.description}</p>
          </div>
          <p>Check-In: {place.checkIn}</p>
          <p>Check-Out: {place.checkOut}</p>
          <p>Max Guests: {place.maxGuests}</p>
        </div>
        <div className=''>
          <BookingWidget place={place} />
        </div>
      </div>

      <div className='bg-white -mx-14 px-14 py-4 border-t'>
        <h2 className='text-2xl font-semibold mb-4'>Extra Info</h2>
        <p className='text-gray-500'>{place.extraInfo}</p>
      </div>
    </div>
  );
};
