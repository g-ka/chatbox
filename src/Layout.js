import React from 'react';
import { Outlet } from 'react-router-dom';
import useData from './hooks/useData';

const Layout = () => {  

  const { set_is_open } = useData();

  return (
    <main
      onClick={e => {
        const text = e.target.className.baseVal;   
        if(!text?.includes('header_menu_icon')) set_is_open(false);        
      }}
    >
      <Outlet />
    </main>    
  )
}

export default Layout