import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from '../api/Axios';
import useData from '../hooks/useData';
import { faTrash, faPaperPlane, faRotateRight, faCompass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Chat_box = () => {

  const { prev_chat, other_username, fetch_messages } = useData();

  const [ message, set_message ] = useState('');
  const [ button , set_button ] = useState('Send');
  const [ send_err_msg, set_send_err_msg ] = useState('');
  const [ icon, set_icon ] = useState(faPaperPlane);
  const [ del_load, set_del_load ] = useState(false);

  const button_event = { pointerEvents: button === 'Send' ? 'auto' :'none'};
  const del_icon = { pointerEvents: del_load ? 'none' : 'auto' };

  const send_message = async (e) =>
  {
    e.preventDefault();
    set_button('Sending');
    set_icon(faCompass);

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
        set_icon(faPaperPlane);
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
          set_icon(faPaperPlane);
        }, 2000);
      } 
    } 
  };

  const delete_message = async (id) =>
  {
    set_del_load(true);

    try
    {
      const response = await Axios.delete(
        `/chat_box/delete_message/${other_username}/${id}`,
        {
          headers: { "Content-Type": 'application/json' },
          withCredentials: true
        }
      );

      if(response.status === 200) fetch_messages(other_username);
    }
    catch(err)
    {
      return
    }
    finally
    {
      set_del_load(false);
    }
  };

  return (
    <section className='chat_box_section'>
      <div className='chat_box_section_top'>
        CHAT BOX - {other_username}
      </div>        
      <ul className='chat_box_section_chat'>
        {
          prev_chat.map(chat => {
            return(
              <li className={chat.auth ? 'chat_box_section_chat_right' : 'chat_box_section_chat_left'} key={chat._id}>
                <p>{chat.message}</p>
                { chat.auth ? <FontAwesomeIcon style={del_icon} className='chat_box_section_chat_right_trash' icon={faTrash} onClick={() => delete_message(chat.id)}/> : null}                
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
          type='submit'
          style={button_event}
        >
          <FontAwesomeIcon className='chat_box_section_form_send_button_icon' icon={icon} spin={icon===faCompass ? true : false}/>
        </button>
        <div className='chat_box_section_form_navs'>             
          <button 
            className='chat_box_section_form_navs_refresh'
            onClick={() => fetch_messages(other_username)}
            type='button'
          >
            <FontAwesomeIcon className='chat_box_section_form_navs_refresh_icon' icon={faRotateRight}/>
          </button>
          <Link className='chat_box_section_form_navs_back' to='/auth/connections'>Back</Link>   
        </div>
      </form>            
    </section>
  )
}

export default Chat_box