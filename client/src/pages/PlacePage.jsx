import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import BookingWidget from './BookingWidget'
import PlaceGallery from './PlaceGallery'
import AddressLink from '../AddressLink'


const PlacePage = () => {
    const {id} = useParams()
    const [place,setPlace] = useState(null);

    useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return '';


  return (
  <div className='m-1 sm:m-6 px-8 py-8 '>
      <h1 className='text-lg sm:text-2xl font-semibold'> {place.title} </h1>

      <AddressLink address={place.address} title={place.title} />

      <PlaceGallery place={place} />

    <div >
      <div className='my-4 font-semibold gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
        <div >
          <div className='border-y-2 rounded-lg p-2 my-4' >
          <h1 className='font-bold text-gray-200 text-sm sm:text-lg '>Description - </h1>
          <p className='text-gray-700 text-xs sm:text-lg'>{place.description}</p>
          </div  >
          <div className='text-sm sm:text-lg ml-2'>
          Check-in: {place.checkIn} <br/>
          Check-out: {place.checkOut}<br/>
          Max number of guests: {place.maxGuests}
          </div>
          
        </div>
        <div className='bg-gray-200 shadow p-4 rounded-2xl'>
            <BookingWidget place={place} />
        </div>
      </div>
        <div className='border-t-2 p-2 my-4'>
          <h1 className='font-bold text-sm sm:text-lg'>Extra Info - </h1>
          <p className='text-gray-700  text-xs sm:text-lg'>{place.extraInfo}</p>
        </div>
    </div>
  </div>
   
  )
}

export default PlacePage

        


