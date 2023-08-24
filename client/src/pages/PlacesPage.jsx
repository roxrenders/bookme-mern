import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "./PlaceImg";

const PlacesPage = () => {
    const [places, setPlaces] = useState([])

  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem("userData"));
    axios.get('/user-places', {
      headers: {
        Authorization: `${userData.token}`,
        "Content-Type": "application/json",
      },
    }).then(({data})=>{
    setPlaces(data); 
    
   
    }); 
  },[]);

  return (
    <div>
        <AccountNav/>
        <div className="text-center py-2 m-2 ">
          <Link to={'/account/places/new'} className="inline-flex text-center justify-center items-center gap-1 bg-primary text-white text-sm py-1 px-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Place
          </Link>
        </div>

        <div className="mt-4 max-w-auto ">
        {places.length > 0 && places.map(place => (
          <Link to={'/account/places/' + place._id} key={place._id}>
          <div className="flex gap-2 cursor-pointer bg-gray-200 p-2 m-2 rounded-2xl grow shrink-0">
          <div className="flex bg-white h-32 w-32">
              <PlaceImg place={place} />
          </div>
          <div className="h-[3.5rem] ">
             <h2 className="text-sm font-semibold truncate pb-2" style={{ maxWidth: '100px' }}>{place.title}</h2>
             <p className="text-xs font-thin sm:text-sm overflow-y-auto " style={{ maxHeight: '100px' }}>
              {place.description}
             </p>
          </div>
        </div>
      </Link>
          ))}
    </div>
    </div>
  );
};

export default PlacesPage;
