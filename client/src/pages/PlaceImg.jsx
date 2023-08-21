import React from 'react'

const PlaceImg = ({place, index=0, className=null}) => {
    if(!place.photos.length){
        return "";
    }
    if(!className){
        className = 'object-cover';
    }
    
    return (
        <div className="flex bg-white h-32 w-32">
              {place.photos.length > 0 && (
               <img className="object-cover" src={'https://bookme-clone-mern-server.vercel.app/uploads/' + place.photos[index]} alt="" />
              )}
          </div>
    )
 
}

export default PlaceImg