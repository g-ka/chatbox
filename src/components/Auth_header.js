import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Auth_header = () => {

  const navStyles = ({ isActive }) => {
    return {
      color: isActive ? 'rgb(88, 88, 251)' : 'white',
      textDecoration: 'none'
    }
  };

  return (
    <header className='header'>
      <Link to='/auth/' className='header_name'>Chatbox</Link>
      <nav className='header_nav'>
        <NavLink 
          to='/auth/' 
          style={navStyles}
          end
        >
          Home
        </NavLink>
        <NavLink 
          to='/auth/req_sent' 
          style={navStyles}
        >
          Requests Sent
        </NavLink>
        <NavLink 
          to='/auth/req_recieved'
          style={navStyles}
        >
          Requests Recieved
        </NavLink>
        <NavLink 
          to='/auth/connections' 
          style={navStyles}
        >
          Connections
        </NavLink>        
      </nav>      
    </header>
  )
}

export default Auth_header