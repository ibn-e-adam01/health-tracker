import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi"; // Three lines
import { FiMoreVertical } from "react-icons/fi"; // Three vertical dots

const NavbarProfile = () => {

    const [isOpen, setisOpen] = useState(false);

    const toggleMenu = () => {
        setisOpen(!isOpen);
    }
    
  return (
    <>
    <div className='w-full h-13 bg-[#CB2957] text-white flex items-center justify-between md:px-15 px-7 sticky top-0 z-50 shadow-md'>
        <Link className='hover:scale-95 hover:text-zinc-100 active:scale-95 active:text-zinc-100' to='/'><i className="fa-regular fa-house text-2xl md:text-3xl"></i></Link>
        <h1 className='font-[ArizoniaCustom] md:text-4xl text-3xl md:mr-10'>Health Tracker</h1>
        <button className='hover:cursor-pointer hover:scale-95 hover:text-zinc-100 active:scale-95 active:text-zinc-100' onClick={toggleMenu} ><GiHamburgerMenu size={28} /></button>
    </div>
    </>
  )
}

export default NavbarProfile