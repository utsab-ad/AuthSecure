
import {RouteLogin } from '../helper/RouteNames.js'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const AuthRouteProtection = () => {

    const user = useSelector(state => {
      state.user})
    if(user && user.isLoggedIn) {

  return (
    <Outlet/>
  )
} else {
    return <Navigate to={RouteLogin} />
}
}

export default AuthRouteProtection