import axios from 'axios';
import { useState } from 'react';

export const PhotosUploader = ({ addPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState('');

  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', {
      link: photoLink,
    });
    onChange(prev => {
      return [...prev, filename];
    });
    setPhotoLink('');
  }

  function uploadPhoto(e) {
    // e.preventDefault();
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios
      .post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(res => {
        const { data: filenames } = res;
        onChange(prev => {
          return [...prev, ...filenames];
        });
      });
  }

  return (
    <>
      <div className='flex gap-2'>
        <input
          type='text'
          placeholder='Add using a link ...jpg'
          value={photoLink}
          onChange={e => setPhotoLink(e.target.value)}
        />
        <button
          className='bg-gray-200 rounded-2xl px-4'
          onClick={addPhotoByLink}
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className='mt-2 grid gap-2 grid-cols-3 md:grid-col-4 lg:grid-cols-6'>
        {addPhotos.length > 0 &&
          addPhotos.map((link, index) => (
            <div key={index} className='h-40 flex'>
              <img
                className='rounded-2xl w-full object-cover'
                src={'http://127.0.0.1:3000/uploads/' + link}
                alt={link + index}
              />
            </div>
          ))}
        <label className='h-40 flex justify-center items-center gap-1 border rounded-2xl p-4 text-2xl text-gray-600 cursor-pointer'>
          <input
            type='file'
            className='hidden'
            multiple
            onChange={uploadPhoto}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-8 h-8'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z'
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};
