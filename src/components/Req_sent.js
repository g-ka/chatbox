import React, { useEffect, useState } from 'react';
import Axios from '../api/Axios';

const Req_sent = () => {

  const [ req_sent_list, set_req_sent_list ] = useState([]);

  const [ is_loading, set_is_loading ] = useState(true);
  const [ err_msg, set_err_msg ] = useState('');

  useEffect(() =>
  {
    const fetch_req_sent_handler = async () =>
    {
      try
      {
        const response = await Axios.get(
          '/req_sent',
          {
            headers: { "Content-Type": 'application/json' },
            withCredentials: true
          }
        );
        
        if(response.status === 200) set_req_sent_list(response.data.req_sent_list);
      }
      catch(err)
      {
        set_err_msg(err.message);
      }
      finally
      {
        set_is_loading(false);
      }
    };

    fetch_req_sent_handler();
  }, []);

  return (
    <section className='req_sent_section'>
      {
        is_loading ?
         <p className='req_sent_section_loading'>Loading...</p> :
            req_sent_list.length ?
              <ul className='req_sent_section_list'>
                {
                  req_sent_list.map(user => {
                    return(
                      <li key={user.username}  className='req_sent_section_list_user'>
                        <p>{user.username}</p>
                        <p>{user.date}</p>
                      </li>
                    )
                  })
                }
              </ul> :
                <p className='req_sent_section_error'>{err_msg || 'No pending sent requests'}</p>            
      }
    </section>
  )
}

export default Req_sent