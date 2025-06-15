
// import { RouteAdminSignin} from '@/helpers/RouteNames.js'
import { RouteAdminSignin } from '@/helpers/RouteNames';
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const AdminAuthProtection = () => {

    const { isAdmin, error, loading } = useSelector((state) => state.admin);

    if(isAdmin) {

  return (
    <Outlet/>
  )
} else {
    return <Navigate to={RouteAdminSignin} />
}
}

export default AdminAuthProtection;