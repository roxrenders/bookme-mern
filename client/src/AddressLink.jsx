import React from 'react'

function AddressLink({ address, title}) {
  
  return (
    <div>
         <a target='_blank' className='flex my-2 font-light text-xs sm:text-sm underline' href={'https://www.google.com/maps/?q=' + title + address} >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 mr-1 h-4 sm:w-5 sm:h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
      {address}        
    </a>
    </div>
  )
}

export default AddressLink