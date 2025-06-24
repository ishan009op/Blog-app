import React from 'react'
import { NavLink } from 'react-router'
const Header = () => {
  return (
    <>
    <nav className='bg-gray-500 p-6 rounded-md flex'>
      <div className="left text-3xl"><h2 className='font-bold'>iBlog | Create Awesome Blogs</h2></div>
   <div className="right w-1/2">   <ul className='flex justify-center'>
        <NavLink to="/home"  className={({isActive})=>`${isActive ? "text-white" : "text-black"} text-2xl font-semibold m-3 `} >Home</NavLink>
        <NavLink to="/Create"  className={({isActive})=>`${isActive ? "text-white" : "text-black"} text-2xl font-semibold m-3 `} >Create</NavLink>
      </ul>
      </div>
    </nav>
    </>
  )
}

export default Header