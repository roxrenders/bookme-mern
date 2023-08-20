import { Link } from 'react-router-dom'
import React, { useContext } from 'react'; 
import { UserContext } from './userContext';


const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
       <header className=' text-black p-1 flex items-center rounded-sm justify-between '>
       <div >
        <Link
          to={"/"}
          className='flex border border-x-0 items-center rounded-lg p-1 sm:p-2 gap-1 shadow-md shadow-primary'
        >
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4 sm:w-6 sm:h-6 -rotate-90"
        >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
        />
        </svg>
        <span className=' font-semibold px-1 sm:font-bold text-xs sm:text-base'>BookMe</span>
        </Link>
    </div>
    
    <div className='flex gap-1 sm:gap-2 border items-center border-grey-300 rounded-full py-1 sm:py-2   px-2 sm:px-4 shadow-md shadow-primary'>
        <div className='text-xs sm:text-sm'>Place</div>
        <div className='border-l border-grey-300'></div>
        <div className='text-xs sm:text-sm'>Date</div>
        <div className='border-l border-grey-300'></div>
        <div className='text-xs sm:text-sm'>Guest</div>

      <button className='bg-primary text-white rounded-full'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
       </svg>
      </button>
    </div>

    <Link
  to={user ? '/account' : '/login'}
  className='flex items-center gap-1 sm:gap-2 border border-grey-300 rounded-full overflow-hidden py-1 sm:py-2 px-3 sm:px-5 shadow-md shadow-primary'
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4 sm:w-5 sm:h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
  <div className='bg-primary rounded-md text-white relative border border-grey-500'>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-3 h-3 sm:w-4 sm:h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  </div>
  {user && <div className='hidden sm:block text-xs sm:text-base'>{user.name}</div>}
</Link>

       </header>
      </div>
  )
}

export default Header
