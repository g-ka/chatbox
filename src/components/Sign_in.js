import React, { useState } from 'react';
import Axios from '../api/Axios';
import useData from '../hooks/useData';
import { Link, useNavigate } from 'react-router-dom';

const Sign_up = () => {

  const { set_auth } = useData();

  const [ username, set_username ] = useState('');
  const [ password, set_password ] = useState('');

  const [ button , set_button ] = useState('Sign In');
  const [ err_msg, set_err_msg ] = useState('');

  const button_event = { PointerEvents: button === 'Sign In' ? 'auto' :'none'};

  const navigate = useNavigate();

  const submit_handler = async (e) =>
  {
    e.preventDefault();
    set_button('Signing In')

    try
    {
      const response = await Axios.post(
        '/sign_in',
        JSON.stringify({
          username,
          password
        }),
        {
          headers: { "Content-Type": 'application/json' },
          withCredentials: true
        }
      );

      if(response.status === 200)
      {
        set_username('');
        set_password('');
        set_auth({ username });
        navigate('/auth/');
      };
    } 
    catch(err)
    {
      set_err_msg(err.message);    
      set_button('Failed') ; 
    }
    finally
    {
      setTimeout(() =>
      {
        set_button('Sign In');
      }, 3000);
    }           
  };

  return (
    <section className='signin_section'>
      <p className='signin_section_error'>{err_msg}</p>
      <form className='signin_section_form' onSubmit={submit_handler}>
        <label
          htmlFor='username'
          className='signin_section_form_username_label'
        >
          Username:
        </label>
        <input 
          type='text'
          className='signin_section_form_username_input'
          id='username'
          required
          value={username}
          onFocus={() => set_err_msg('')}
          onChange={e => set_username(e.target.value)}
        />
        <label
          htmlFor='password'
          className='signin_section_form_password_label'
        >
          Password:
        </label>
        <input 
          type='password'
          className='signin_section_form_password_input'
          id='password'
          required
          value={password}
          onFocus={() => set_err_msg('')}
          onChange={e => set_password(e.target.value)}
        />
        <button
          type='submit'
          className='signin_section_form_submit'
          style={button_event}
        >
          {button}
        </button>
      </form>
      <div className='signin_section_signup_link'>
        <p>Didn't resigter?</p> 
        <Link to='/'>Sign Up</Link>
      </div>      
    </section>
  )
}

export default Sign_up