import React from 'react';
import { Link } from 'react-router-dom';

const Auth_header = () => {
  return (
    <header>
      <Link to='/auth/'>Home</Link>
      <Link to='/auth/req_sent'>Requests Sent</Link>
      <Link to='/auth/req_recieved'>Requests Recieved</Link>
      <Link to='/auth/connections'>Connections</Link>
    </header>
  )
}

export default Auth_header