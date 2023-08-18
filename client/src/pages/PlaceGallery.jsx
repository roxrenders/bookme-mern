import React, { useState } from 'react'

const PlaceGallery = ({place}) => {

    const [showAllPhotos,setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
          <div className="absolute inset-0 ">
            <div className="grid gap-4 p-4 w-full bg-gray-500 ">
                <h1 className='flex justify-center items-center  text-xl sm:text-3xl font-semibold'> {place.title} </h1>
                <a target='_blank' className=' flex justify-center text-sm sm:text-lg items-center my-1 font-semibold underline' href={'https://www.google.com/maps/?q=' + place.title + place.address} > 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mx-1 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                 </svg>
                {place.address}
                </a>
         
              <div>
                <button onClick={()=>setShowAllPhotos(false)} className='fixed right-2 sm:right-10 top-10 flex gap-1 py-1 px-2 sm:px-8 sm:py-4 sm:text-xl rounded-2xl  text-sm bg-transparent text-black font-semibold shadow-md border-2 shadow-black' >Close All</button>
              </div>
              {place?.photos?.length > 0 &&
                place.photos.map(photo => (
                  <div key={photo} className="flex justify-center  items-center">
                    <img
                      className="max-w-full h-auto"
                      src={"https://airbnb-clone-mern-server.vercel.app/uploads/" + photo}
                      alt=""
                    />
                  </div>
                ))}
            </div>
          </div>
        );
      }
  return (
    <div className='relative  '>
    <div className="grid gap-1 sm:gap-2  grid-cols-[2fr_1fr] rounded-2xl overflow-hidden   ">
        <div>
          {place.photos?.[0] && (
            <img onClick={()=>setShowAllPhotos(true)} className='aspect-square object-cover shadow-lg shadow-black ' src={"https://airbnb-clone-mern-server.vercel.app/uploads/" + place?.photos[0]} alt="" />
          )}
        </div>
        <div className='grid '>
          <div >
          {place.photos?.[1] && (
            <img onClick={()=>setShowAllPhotos(true)} className='aspect-square object-cover shadow-lg shadow-black' src={"https://airbnb-clone-mern-server.vercel.app/uploads/" + place.photos[1]} alt="" />
          )}
          </div>
          <div className=' overflow-hidden'>
          {place.photos?.[2] && (
            <img onClick={()=>setShowAllPhotos(true)} className='aspect-square object-cover relative top-1 sm:top-2 shadow-lg shadow-black' src={"https://airbnb-clone-mern-server.vercel.app/uploads/" + place.photos[2]} alt="" />
          )}
          </div>
        </div>
      </div>
     <button onClick={()=>setShowAllPhotos(true)} className='flex items-center absolute bottom-2 left-2 rounded-2xl p-1 text-xs font-semibold shadow-md border-2 shadow-black sm:text-lg sm:text-bold sm:px-4 sm:py-2 sm:bottom-4 sm:font-bold sm:left-4 '>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6 mr-1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
      Show All
      </button>
    </div>
  )
}

export default PlaceGallery
