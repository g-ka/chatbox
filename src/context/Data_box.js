import { createContext, useState } from "react";
import Axios from "../api/Axios";

const Data_box = createContext({});

const Data_provider = ({children}) =>
{

  const [ auth, set_auth ] = useState({});
  const [ prev_chat, set_prev_chat ] = useState([]);
  const [ other_username, set_other_username ] = useState('');
  const [ is_open, set_is_open ] = useState(false);

  const fetch_messages = async (username) =>
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
    }
  };

  return(
    <Data_box.Provider
      value={{
        auth, set_auth,
        prev_chat, set_prev_chat,
        other_username, set_other_username,
        is_open, set_is_open,
        fetch_messages        
      }}
    >
      {children}
    </Data_box.Provider>
  )  
};

export { Data_box , Data_provider }