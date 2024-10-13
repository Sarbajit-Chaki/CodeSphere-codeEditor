import React from 'react'
import logo from '@/assets/Auth/CodeSphere Logo.png'

const Navbar = () => {
  return (
    <div className=' w-full h-16 flex justify-between items-center bg-[#1f1f1f] border-b border-b-slate-700 px-4 sm:px-12 lg:px-20 '>
        <div className=' flex items-center'>
            <img className=' size-12 ' src={logo} alt="logo" />
            <div className=' text-white font-bold text-2xl'>CodeSphere</div>
        </div>

        <div className=' flex items-center gap-4 lg:gap-8'>
            <div className=' text-gray-400 hover:text-gray-200 cursor-pointer hidden md:block'>Home</div>
            <div className=' text-gray-400 hover:text-gray-200 cursor-pointer hidden md:block'>About</div>
            <div className=' text-gray-400 hover:text-gray-200 cursor-pointer hidden md:block'>Features</div>
            <button className=' bg-slate-200 text-black h-10 w-24 hover:font-semibold rounded-full '>Join Now</button>
        </div>
    </div>
  )
}

export default Navbar
