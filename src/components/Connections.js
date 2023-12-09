import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../api/Axios';
import useData from '../hooks/useData';

const Connections = () => {

  const { set_prev_chat, set_other_username } = useData();

  const [ connections_list, set_connections_list ] = useState([]);  

  const [ msg , set_msg ] = useState('');
  const [ is_loading, set_is_loading ] = useState(true);
  const [ connections_list_err_msg, set_connections_list_err_msg ] = useState('');
  const [ chat_err_msg, set_chat_err_msg ] = useState('');

  const navigate = useNavigate();

  const button_style = { pointerEvents: msg === '' ? 'auto' :'none'};

  useEffect(() =>
  {
    const fetch_connections_handler = async () =>
    {
      try
      {
        const response = await Axios.get(
          '/connections',
          {
            headers: { "Content-Type": 'application/json' },
            withCredentials: true
          }
        );
        
        if(response.status === 200) set_connections_list(response.data.connections_list);
      }
      catch(err)
      {
        set_connections_list_err_msg(err.message);
      }
      finally
      {
        set_is_loading(false);
      }
    };

    fetch_connections_handler();
  }, []);

  const fetch_messages = async (username) =>
  {
    set_msg('fetching chat');

    try
    {
      const response = await Axios.post(
        '/chat_box',
        { username },
        {
          headers: { "Content-Type": 'application/json' },
          withCredentials: true
        }
      );

      if(response.status === 200) 
      {
        set_prev_chat(response.data.sorted_messages);
        set_other_username(username);
        navigate('/auth/chat_box');
      }
    }
    catch(err)
    {
      set_chat_err_msg(err.message);
      set_msg('Failed') ; 
    }
    finally
    {
      setTimeout(() =>
      {
        set_msg('');
      }, 3000);
    } 
  };

  return (
    <section className='connections_section'>
      <div className='connections_section_top'>
        CONNECTIONS
      </div>
      <div>
        <p>{msg}</p>
      </div>
      {
        is_loading ?
         <p className='connections_section_loading'>Loading...</p> :
            connections_list.length ?
              <ul className='connections_section_list'>
                {
                  connections_list.map(user => {
                    return(
                      <li key={user.username}  className='connections_section_list_user'>
                        <p>{user.username}</p>
                        <button 
                          onClick={() => fetch_messages(user.username)}
                          style={button_style}
                        >
                          Chat
                        </button>
                      </li>
                    )
                  })
                }
              </ul> :
                <p className='connections_section_error'>{connections_list_err_msg || 'No connections'}</p>            
      }
    </section>
  )
}

export default Connections