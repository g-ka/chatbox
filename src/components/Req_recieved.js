import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../api/Axios';

const Req_recieved = () => {

  const [ req_recieved_list, set_req_recieved_list ] = useState([]);

  const [ is_loading, set_is_loading ] = useState(true);
  const [ req_accept_loading, set_req_accept_loading ] = useState(false);
  const [ recieved_list_err_msg, set_recieved_list_err_msg ] = useState('');
  const [ req_accept_err_msg, set_req_accept_err_msg ] = useState('');

  const navigate = useNavigate();

  useEffect(() =>
  {
    const fetch_req_recieved_handler = async () =>
    {
      try
      {
        const response = await Axios.get(
          '/req_recieved',
          {
            headers: { "Content-Type": 'application/json' },
            withCredentials: true
          }
        );
        
        if(response.status === 200) set_req_recieved_list(response.data.req_recieved_list);
      }
      catch(err)
      {
        set_recieved_list_err_msg(err.message);
      }
      finally
      {
        set_is_loading(false);
      }
    };

    fetch_req_recieved_handler();
  }, []);

  const req_accept_handler = async (username) =>
  {
    set_req_accept_loading(true);

    try
    {
      const response = await Axios.post(
        '/req_recieved/accept_req',
        { username },
        {
          headers: { "Content-Type": 'application/json' },
          withCredentials: true
        }
      );

      if(response.status === 200) navigate('/auth/connections');
    }
    catch(err)
    {
      set_req_accept_err_msg(err.message);
    }
    finally
    {
      set_req_accept_loading(false);
    }
  };

  return (
    <section className='req_recieved_section'>
      <div className='req_recieved_section_top'>
        REQUEST(S) RECIEVED 
      </div>
      {
        is_loading ?
         <p className='req_recieved_section_loading'>Loading...</p> :
            req_recieved_list.length ?
              <ul className='req_recieved_section_list'>
                {
                  req_recieved_list.map(user => {
                    return(
                      <li key={user.username}  className='req_recieved_section_list_user'>
                        <p>{user.username}</p>
                        <p>{user.date}</p>
                        <p>{user.time}</p>
                        <button 
                          onClick={() => req_accept_handler(user.username)}
                          style={{pointerEvents: req_accept_loading ? 'none' : 'auto'}}
                        >
                          Accept Request
                        </button>
                      </li>
                    )
                  })
                }
              </ul> :
                <p className='req_recieved_section_error'>{recieved_list_err_msg || 'No new requests recieved'}</p>            
      }
    </section>
  )
}

export default Req_recieved