import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useData from './hooks/useData';
import Header from './components/Auth_header';

const Auth_layout = () => {

  const { auth } = useData();
  const location = useLocation();

  return (
    <>            
      {
        auth?.username ?
          <>
            <Header />
            <Outlet />
          </> :
            <Navigate to='/sign_in' state={{ from: location }} replace />
      }             
    </>
  )
}

export default Auth_layout