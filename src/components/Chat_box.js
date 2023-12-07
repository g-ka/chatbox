import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from '../api/Axios';
import useData from '../hooks/useData';
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Chat_box = () => {

  const { prev_chat, other_username, fetch_messages } = useData();

  const [ message, set_message ] = useState('');
  const [ button , set_button ] = useState('Send');
  const [ send_err_msg, set_send_err_msg ] = useState('');

  const button_event = { pointerEvents: button === 'Send' ? 'auto' :'none'};

  const send_message = async (e) =>
  {
    e.preventDefault();
    set_button('Sending');

    try
    {
      const response = await Axios.post(
        '/chat_box/message',
        { 
          other_username, 
          message 
        },
        {
          headers: { "Content-Type": 'application/json' },
          withCredentials: true
        }
      )

      if(response.status === 200) 
      {
        set_message('');
        set_button('Send');
        fetch_messages(other_username);
      }
    }
    catch(err)
    {
      set_send_err_msg(err.message);
      set_button('Failed');
    }
    finally
    {
      if(button !== 'Send')
      {
        setTimeout(() =>
        {
          set_button('Send');
        }, 2000);
      } 
    } 
  };

  return (
    <section className='chat_box_section'>
      <div className='chat_box_section_top'>
        CHAT BOX - {other_username}
      </div>
      <div className='chat_box_section_navs'>
        <Link className='chat_box_section_navs_back_button' to='/auth/connections'>Back</Link>      
        <button onClick={() => fetch_messages(other_username)}>Refresh to load new messages</button>
      </div>  
      <ul className='chat_box_section_chat'>
        {
          prev_chat.map(chat => {
            return(
              <li className={chat.auth ? 'chat_box_section_chat_right' : 'chat_box_section_chat_left'} key={chat._id}>
                {/* { chat.auth ? <FontAwesomeIcon className='chat_box_section_chat_right_trash' icon={faTrash} onClick={() => delete_message(chat.id)}/> : null} */}
                <p>{chat.message}</p>
              </li>
            )
          })
        }
      </ul>
      <form className='chat_box_section_form' onSubmit={send_message}>
        <input 
          type='text'
          className='chat_box_section_form_message_input'
          required
          value={message}
          onChange={e => set_message(e.target.value)}
        />
        <button 
          className='chat_box_section_form_send_button'
          style={button_event}
        >
          {button}
        </button>
      </form>      
    </section>
  )
}

export default Chat_box