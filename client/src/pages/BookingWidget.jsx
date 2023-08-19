import React, { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../userContext';

const BookingWidget = ({place}) => {
    const [checkIn, setCheckIn] = useState(""); 
    const [checkOut, setCheckOut] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState("");
    const [redirect, setRedirect] = useState(null);  
    const [phone, setPhone] = useState("+91");
    const {user} = useContext(UserContext);

    useEffect(() => {
      if (user) {
        setName(user.name);
      }
    }, [user]);

    let numberOfNights = 0;
    if(checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    };

    async function bookThisPlace() {
      try {
        const response = await axios.post('/bookings', {
          checkIn,checkOut,numberOfGuests,
          name,phone,place: place._id,
          price: numberOfNights * place.price,
        }, {
          withCredentials: true, // Added this line to send credentials
        });
    
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
      } catch (error) {
        console.error('Error booking the place:', error);
        // Handle error as needed
      }
    }
    


    if(redirect){
      return <Navigate to={redirect}/>
    }
    
  return (
    <>
    <div className='text-sm sm:text-2xl mb-2 sm:mb-4 text-center font-bold'>
                Price: ${place.price} / per night
    </div>
          <div className="border rounded-2xl">
          <div className="grid lg:flex">
            <div className='p-4 text-sm sm:text-xl '>
              <label> Check In: </label>
              <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
            </div>
            <div className='p-4 text-sm sm:text-xl'>
              <label> Check Out: </label>
              <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
            </div>
          </div>
          <div className='p-4 text-sm sm:text-xl '>
          <label> Number Of Guest </label>
              <input type="number" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} placeholder='1' />
              {numberOfNights > 0 && (
                <div>
                    <div className='py-4 text-sm sm:text-xl '>
                    <label> Name </label>
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
                </div>
                    <div className='py-4 text-sm sm:text-xl '>
                    <label> Phone Number </label>
                    <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} />
                </div>
                </div>
              )}
          <button onClick={bookThisPlace} className='primary p-1  text-sm sm:text-xl'>
            Book Place for  
            {numberOfNights > 0 && (
                <span> ${numberOfNights * place.price} </span>
            )}
          </button>
          </div>
        </div> 
        </>
  )
}

export default BookingWidget

