import { RouteIndex } from '@/helper/RouteNames.js'
import React from 'react'
import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

const HomeNavigation = () => {
  const navigate = useNavigate();
  return (
         <button
        onClick={() => navigate(RouteIndex)}
        className={`fixed mr-2 mt-2 pr-2 pt-2 right-0 hover:text-stone-600 top-0 cursor-pointer`}
      >
        <FaHome />
      </button>
  )
}

export default HomeNavigation