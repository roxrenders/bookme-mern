import React, { useEffect, useState } from 'react'
import Perks from "../Perks";
import { PhotosUploader } from "../PhotosUploader";
import AccountNav from '../AccountNav';
import axios from 'axios';
import {Navigate, useParams} from "react-router-dom";

const PlacesFormPage = () => {

  const {id} = useParams(); 
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [redirect, setRedirect] = useState(false);
  
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then(response => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
      setAddedPhotos(data.photos);
    });

  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <h4 className="text-ll mt-2 text-gray-500/[0.90]">{text}</h4>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
 
  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price,
    };
    if (id) {
      // update
      await axios.put('/places', {
        id, ...placeData
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post('/places', placeData);
      setRedirect(true);
    }

  }
  
  if (redirect) {
    return <Navigate to={'/account/places'} />;f
  }

  return (
    <div className="text-center sm:px-40 lg:px-30 py-4">
    <AccountNav/>
    <form  onSubmit={savePlace}>
      {preInput(
        "Title",
        "Title for your place should be short and catchy"
      )}
      <input
        type="text"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        placeholder="Title!"
      />

      {preInput("Address", "Address to this place")}
      <input
        type="text"
        value={address}
        onChange={(ev) => setAddress(ev.target.value)}
        placeholder="Address!"
      />

      {preInput("Photos", "Add more photos to enhance the attraction")}

      <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

      {preInput("Description", "Description of the Place")}
      <textarea
        type="text"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
        placeholder="Description!"
      />

      {preInput("Perks", "Select all the perk of your place")}

      <Perks selected={perks} onChange={setPerks} />

      {preInput("Extra info", "House rules, etc")}

      <textarea
        value={extraInfo}
        onChange={(ev) => setExtraInfo(ev.target.value)}
      />

      {preInput("Check In & Out times", "Add check In and Out")}

  <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-4 ">
        <div>
          <h3 className="mb-1 mt-2">Check In Time</h3>
          <input
          
            type="text"
            value={checkIn}
            onChange={(ev) => setCheckIn(ev.target.value)}
            placeholder="14:00"
          />
        </div>
        <div>
          <h3 className="mb-1 mt-2">Check In Out</h3>
          <input
            type="text"
            value={checkOut}
            onChange={(ev) => setCheckOut(ev.target.value)}
            placeholder="11:00"
          />
        </div>
        <div>
          <h3 className="mb-1 mt-2"> Total Guests</h3>
          <input
            type="number"
            value={maxGuests}
            onChange={(ev) => setMaxGuests(ev.target.value)}
          />
        </div>  
        <div>
          <h3 className="mb-1 mt-2"> Price Per Night</h3>
          <input
            type="number"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
          />
        </div> 
      </div>
      
      <div className='flex justify-center'>
        <button className="primary my-4 font-bold" >save</button>
      </div>
    </form>
  </div>
  )
}

export default PlacesFormPage



