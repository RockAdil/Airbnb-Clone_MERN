export const BookingWidget = ({ place }) => {
  return (
    <div className='bg-white shadow-md border border-gray-300 p-4 rounded-2xl'>
      <div className='text-2xl text-center'>
        Price: ${place.price} / per night
      </div>
      <div className='border rounded-2xl my-4'>
        <div className='flex justify-evenly'>
          <div className='py-3 px-4'>
            <label>Check-In: </label>
            <input type='date' name='' id='' />
          </div>
          <div className='py-3 px-4 border-l'>
            <label>CheckOut: </label>
            <input type='date' name='' id='' />
          </div>
        </div>
        <div>
          <div className='py-3 px-4 border-t'>
            <label>No of Guest: </label>
            <input type='number' value={1} />
          </div>
        </div>
      </div>

      <button className='primary mt-4'>Book this place</button>
    </div>
  );
};
