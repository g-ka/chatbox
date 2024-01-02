import React from 'react';
import { Outlet } from 'react-router-dom';
import useData from './hooks/useData';

const Layout = () => {  

  const { set_is_open } = useData();

  return (
    <main
      onClick={e => {
        const text = typeof(e.target.className)==='object' ? '' : e.target.className;  
        if(!text?.includes('ham_nav') || text?.includes('ham_nav_link')) set_is_open(false);                  
      }}
      style={{ position: 'relative' }}
    >
      <Outlet />
    </main>    
  )
}

export default Layout