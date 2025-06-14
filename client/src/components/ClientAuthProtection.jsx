
import { RouteClientSignin} from '@/helpers/RouteNames.js'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const ClientAuthProtection = () => {

    const { isClient, error, loading } = useSelector((state) => state.client);

    if(isClient) {

  return (
    <Outlet/>
  )
} else {
    return <Navigate to={RouteClientSignin} />
}
}

export default ClientAuthProtection;