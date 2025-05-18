import { RouteIndex } from '@/helper/RouteNames.js'
import React from 'react'
import { Link } from 'react-router-dom'

const Page_404 = () => {
  return (
    <div className='flex justify-center items-center min-h-screen  w-full'>

    <div className='w-full px-5 h-full flex flex-col  items-left'>

      <p className='text-sm font-semibold text-gray-200'>Authentication</p>

    <h2 className='text-3xl font-bold '>404 Page Not Found</h2>
    <p>Oops! The page you're looking for doesn't exist or has been moved.</p>
       <Link to={RouteIndex} className='flex justify-start items-center w-full cursor-pointer'>
        <p className='text-sm w-fit py-2 text-blue-600 hover:underline text-right'>Go Back →</p>
    </Link>
    </div>

    </div>
  )
}

export default Page_404