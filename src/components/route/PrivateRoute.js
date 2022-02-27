import React,{useEffect} from 'react'
import { DefaultLayout } from '../layout/DefaultLayout';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
    const accessToken  = sessionStorage.getItem("accessToken")

    useEffect(() => {},[accessToken])
    return accessToken ? <DefaultLayout>{children}</DefaultLayout> : <Navigate to="/login" />;
  }

export default PrivateRoute