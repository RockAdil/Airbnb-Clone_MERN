import { Routes, Route } from 'react-router-dom';
import { IndexPage } from './pages/IndexPage';
import { LoginPage } from './pages/LoginPage';
import { Layout } from './Layout';
import { RegisterPage } from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import { AccountPage } from './pages/AccountPage';

axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/account/bookings' element={<AccountPage />} />
          <Route path='/account/places' element={<AccountPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
