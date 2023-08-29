import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post('/login', { email, password });

      setUser(data);
      alert('Login Successful!');
      setRedirect(true);
    } catch (e) {
      alert('Login Failed!');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className='mt-4 grow flex justify-around items-center'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form
          action=''
          className='max-w-xl mx-auto'
          onSubmit={handleLoginSubmit}
        >
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
          <button className='primary'>Login</button>
          <div className='text-center py-2 text-gray-500'>
            Don&apos;t have an account yet?{' '}
            <Link to={'/register'} className='text-black underline'>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
