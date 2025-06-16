import { RouteIndex } from '@/helpers/RouteNames.js'
import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const HomeButton = () => {
  return (
    <div className='fixed top-2 right-2'>
        <Link to={RouteIndex}>
            <FaHome/>
        </Link>
    </div>
  )
}

export default HomeButton