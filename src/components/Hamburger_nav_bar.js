import React from 'react';
import { Link } from 'react-router-dom';
import useData from '../hooks/useData';

const Hamburger_nav_bar = () => {

  const { is_open } = useData();

  return (
    <nav 
      className='ham_nav'
      style={{ 
        opacity: is_open ? '1' : '0',
        pointerEvents: is_open ? 'auto' : 'none' 
      }}
    >
      <Link to='/auth/' className='ham_nav_link'>Home</Link>
      <Link to='/auth/req_sent' className='ham_nav_link'>Requests Sent</Link>
      <Link to='/auth/req_recieved' className='ham_nav_link'>Requests Recieved</Link>  
      <Link to='/auth/connections' className='ham_nav_link'>Connections</Link>  
    </nav>
  )
}

export default Hamburger_nav_bar