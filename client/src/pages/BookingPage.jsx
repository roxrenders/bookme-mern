import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AccountNav from '../AccountNav';
import AddressLink from '../AddressLink';
import PlaceGallery from './PlaceGallery';
import BookingDates from './BookingDates';


const BookingPage = () => {
    const {id} = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(()=>{
      if(id){
        axios.get('/bookings').then(response =>{
          const foundBooking = response.data.find(({_id}) => _id === id);
          if(foundBooking){
            setBooking(foundBooking);
          }
        });
      }
    },[id]);

    if(!booking){
      return '';
    }

    return(
     <div className='m-4 px-4 py-4  '> 
         <h1 className='text-lg sm:text-2xl font-semibold sm:font-bold'> {booking.place.title} </h1>
         <AddressLink address={booking.place.address} title={booking.place.title} />
       <div className=" bg-gray-200 p-6 my-6 rounded-2xl grid sm:flex items-center justify-between">
        
          <div>
          <h2 className="text-lg sm:text-2xl mb-4">Your Booking Info :</h2>
          <div >
          <BookingDates booking={booking} />
          </div>
         </div>
         
         <div className="bg-primary p-2 my-2 mt-4 sm:mt-0 sm:p-6 text-md sm:text-xl flex justify-center overflow-hidden text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-md"> $ {booking.price}</div>
         </div>
       </div>
         <PlaceGallery place={booking.place} />
    </div>
    )
}

export default BookingPage
