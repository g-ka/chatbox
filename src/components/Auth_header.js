import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Hamburger_nav_bar from './Hamburger_nav_bar';
import { faBars} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useData from '../hooks/useData';

const Auth_header = () => {

  const { set_is_open } = useData();

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
      <button 
        className='header_menu'
      >
        <FontAwesomeIcon 
          className='header_menu_icon' 
          icon={faBars} 
          onClick={(e) => {
            e.stopPropagation();
            set_is_open(prev => !prev);             
          }} 
        />
        <Hamburger_nav_bar />
      </button>
    </header>
  )
}

export default Auth_header