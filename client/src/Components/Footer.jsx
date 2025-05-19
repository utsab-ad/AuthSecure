import React from 'react'
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='flex w-full text-sm text-center bg-black text-white py-3 flex justify-center items-center'>
      <div className='flex justify-center items-center gap-2 flex-wrap'><FaRegCopyright /> <h6>Copyright 2025 | Designed & Developed by Utsab Adhikari</h6></div>
    </div>
  )
}

export default Footer
 