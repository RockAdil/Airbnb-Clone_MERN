import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('Registration Successful!');
    } catch (e) {
      alert('Something Error!!');
    }
  }

  return (
    <div className='mt-4 grow flex justify-around items-center'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form action='' className='max-w-xl mx-auto' onSubmit={registerUser}>
          <input
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type='email'
            placeholder='your@email.com'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className='primary'>Register</button>
          <div className='text-center py-2 text-gray-500'>
            Already have an account?{' '}
            <Link to={'/login'} className='text-black underline'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
