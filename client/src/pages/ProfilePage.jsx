import React, { useContext, useState } from 'react';
import { UserContext } from '../userContext';
import axios from "axios";

import { Navigate, Link, useParams } from 'react-router-dom';
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if(subpage === undefined){
    subpage = 'profile';
  }

  async function logout(){
    await axios.post('/logout');
    setRedirect('/');
    setUser(null); 
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect ) {
    return <Navigate to={'/login'} />;
  }

 

  if(redirect){
    return  <Navigate to={redirect} />
  }

  return (
    <div>
     <AccountNav/>
      {subpage === 'profile' && (
      
        <div className='text-center max-w-sm py-6 text-xl mx-auto'>
          Logged in as {user.name} ({user.email}) <br/>
          <button onClick={logout} className='primary max-w-lg mt-2'> Logout</button>
        </div>
      )
      }

      {subpage === 'places' && (
       <div className='text-center py-6 max-w-lg mx-auto'>
         <PlacesPage />
      </div>)
      } 
    </div>
  );
};

export default ProfilePage;
