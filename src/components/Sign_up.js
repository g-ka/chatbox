import React, { useState } from 'react';
import Axios from '../api/Axios';
import { Link } from 'react-router-dom';

const Sign_up = () => {

  const [ username, set_username ] = useState('');
  const [ password, set_password ] = useState('');

  const [ button , set_button ] = useState('Sign Up');
  const [ err_msg, set_err_msg ] = useState('');

  const button_event = { PointerEvents: button === 'Sign Up' ? 'auto' :'none'};

  const submit_handler = async (e) =>
  {
    e.preventDefault();
    set_button('Signing Up')

    try
    {
      const response = await Axios.post(
        '/sign_up',
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
        set_button('Signed Up')
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
        set_button('Sign Up');
      }, 3000);
    }           
  };

  return (
    <section className='signup_section'>
      <p className='signup_section_error'>{err_msg}</p>
      <form className='signup_section_form' onSubmit={submit_handler}>
        <label
          htmlFor='username'
          className='signup_section_form_username_label'
        >
          Username:
        </label>
        <input 
          type='text'
          className='signup_section_form_username_input'
          id='username'
          required
          value={username}
          onFocus={() => set_err_msg('')}
          onChange={e => set_username(e.target.value)}
        />
        <label
          htmlFor='password'
          className='signup_section_form_password_label'
        >
          Password:
        </label>
        <input 
          type='password'
          className='signup_section_form_password_input'
          id='password'
          required
          value={password}
          onFocus={() => set_err_msg('')}
          onChange={e => set_password(e.target.value)}
        />
        <button
          type='submit'
          className='signup_section_form_submit'
          style={button_event}
        >
          {button}
        </button>
      </form>
      <div className='signup_section_signin_link'>
        <p>Already registered?</p> 
        <Link to='/sign_in'>Sign In</Link>
      </div>        
    </section>
  )
}

export default Sign_up