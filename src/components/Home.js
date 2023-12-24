import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../api/Axios';
import useData from '../hooks/useData';
import { faSquareCheck, faShare, faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {

  const { auth, set_auth } = useData();

  const [ users_list, set_users_list ] = useState([]);
  const [ connections_name, set_connections_name ] = useState([]);
  const [ req_sent_name, set_req_sent_name ] = useState([]);
  const [ req_recieved_name, set_req_recieved_name ] = useState([]);

  const [ is_loading, set_is_loading ] = useState(true);
  const [ req_sent_loading, set_req_sent_loading ] = useState(false);
  const [ users_list_err_msg, set_users_list_err_msg ] = useState('');
  const [ req_sent_err_msg, set_req_sent_err_msg ] = useState('');  
  const [ signout_button, set_signout_button ] = useState('Sign Out');

  const sign_out_styles = { pointerEvents: signout_button==='Sign Out' ? 'auto' : 'none'};

  const navigate = useNavigate();

  useEffect(() =>
  {
    const fetch_users = async () =>
    {
      try
      {
        const response = await Axios.get(
          '/fetch_users',
          {
            headers: { "Content-Type": 'application/json' },
            withCredentials: true
          }
        );

        if(response.status === 200) 
        {
          const { users, connections, req_sent, req_recieved } = response.data;
          const filtered_list = users.filter(user => user.username !== auth.username);
          set_users_list(filtered_list);
          set_connections_name(connections);
          set_req_sent_name(req_sent);
          set_req_recieved_name(req_recieved);
        }
      }
      catch(err)
      {
        set_users_list_err_msg(err.message);
      }
      finally
      {
        set_is_loading(false);
      }
    };
    
    fetch_users();
  }, []);

  const sign_out_handler = async () =>
  {
    set_signout_button('Signing Out...');

    try
    {
      const response = await Axios.get(
        '/sign_out',
        {
          headers: { "Content-Type": 'application/json' },
          withCredentials: true
        }
      );

      if(response.status === 200) 
      {
        set_auth({});
      }
    }
    catch(err)
    {
      set_signout_button('Failed');
    }
    finally
    {
      setTimeout(() =>
      {
        set_signout_button('Sign Out');
      }, 3000);
    }
  }

  const connect_handler = async (username) =>
  {
    set_req_sent_loading(true);

    try
    {
      const response = await Axios.post(
        '/req_sent',
        { 
          auth_username: auth.username,
          username 
        },
        {
          headers: {"Content-Type": 'application/json'},
          withCredentials: true          
        }
      );

      if(response.status === 200) navigate('/auth/req_sent');
    }
    catch(err)
    {
      set_req_sent_err_msg(err.message);
    }
    finally
    {
      set_req_sent_loading(false);
      setTimeout(() => {
        set_req_sent_err_msg('');
      }, 3000);
    }
  };

  return (
    <section className='home_section'>
      {
        is_loading ?
          <p className='home_section_loading'>Loading...</p> :
            users_list_err_msg === '' && users_list.length ?
              <ul className='home_section_list'>
                {
                  users_list.map(user => {
                    if(connections_name.includes(user.username))
                      return (
                        <li key={user.username} className='home_section_list_user'>
                          <p>{user.username}</p>
                          <FontAwesomeIcon icon={faSquareCheck} />
                        </li>
                      )
                    else if(req_sent_name.includes(user.username)) 
                      return (
                        <li key={user.username} className='home_section_list_user'>
                          <p>{user.username}</p>
                          <FontAwesomeIcon icon={faShare} />
                        </li>
                      )
                    else if(req_recieved_name.includes(user.username)) 
                      return (
                        <li key={user.username} className='home_section_list_user'>
                          <p>{user.username}</p>
                          <FontAwesomeIcon icon={faReply} />
                        </li>
                      )
                    else 
                      return(
                        <li key={user.username} className='home_section_list_user'>
                          <p>{user.username}</p>
                          <button 
                            onClick={() => connect_handler(user.username)}
                            style={{pointerEvents: req_sent_loading ? 'none' : 'auto'}}
                          >
                            Connect
                          </button>
                        </li>
                      )
                  })
                }
              </ul> :
                <p className='home_section_empty_users'>{users_list_err_msg || 'No users'}</p>
      }      
      <button 
        onClick={sign_out_handler}
        className='home_section_sign_out'
        style={sign_out_styles}
      >
        {signout_button}
      </button>
      <p 
        className='home_section_connection_err_message'
        style={{opacity: req_sent_err_msg? '1' : '0'}}
      >
        {req_sent_err_msg}
      </p>
    </section>    
  )
}

export default Home