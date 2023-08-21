import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const IndexPage = () => {
const [places, setPlace] = useState([]);
  useState(()=>{
    axios.get('/places').then(response=>{
      setPlace(response.data);
    })
  },[])

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
    {places.length > 0 && places.map(place => (
      <Link to={'/place/' + place._id} key={place._id}>
      <div className="bg-gray-500 mb-2 rounded-2xl flex">
          {place.photos.length > 0 && (
           <img className="rounded-2xl object-cover aspect-square" src={'https://airbnb-clone-mern-server.vercel.app' + place?.photos?.[0]} alt="" />
          )}
      </div>
      <h2 className="font-semibold sm:font-bold">{place.title}</h2>
      <h3 className="text-sm text-gray-500">{place.address}</h3>
      
      <div className="mt-1">
            <span className="font-semibold sm:font-bold ">${place.price}</span> per night
      </div>
     
  </Link>
      ))}
</div>
    )
}

export default IndexPage