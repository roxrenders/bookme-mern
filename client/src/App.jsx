
import axios from 'axios';
import {Routes, Route} from 'react-router-dom'


import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import BookingPage from './pages/BookingPage';
import BookingsPage from './pages/BookingsPage';
import { UserContextProvider } from './userContext';





axios.defaults.baseURL = import.meta.env.VITE_BACKEND_API_URL;
axios.defaults.withCredentials = true;


function App() {
  
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}> 
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          
        </Route>
      </Routes>
      </UserContextProvider>
  )
}

export default App

