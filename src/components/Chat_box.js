import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from '../api/Axios';
import useData from '../hooks/useData';
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Chat_box = () => {

  const { prev_chat, other_username } = useData();

  const [ message, set_message ] = useState('');
  const [ send_err_msg, set_send_err_msg ] = useState('');

  const send_message = async (e) =>
  {
    e.preventDefault();

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
      }
    }
    catch(err)
    {
      set_send_err_msg(err.message);
    }
  };

  return (
    <section className='chat_box_section'>
      <div className='chat_box_section_top'>
        CHAT BOX
      </div>
      <Link className='chat_box_section_back_button' to='/auth/connections'>Back</Link>      
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
          value={message}
          onChange={e => set_message(e.target.value)}
        />
        <button className='chat_box_section_form_send_button'>
          Send
        </button>
      </form>      
    </section>
  )
}

export default Chat_box