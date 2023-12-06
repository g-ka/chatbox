import { createContext, useState } from "react";

const Data_box = createContext({});

const Data_provider = ({children}) =>
{

  const [ auth, set_auth ] = useState({});
  const [ prev_chat, set_prev_chat ] = useState([]);
  const [ other_username, set_other_username ] = useState('');

  return(
    <Data_box.Provider
      value={{
        auth, set_auth,
        prev_chat, set_prev_chat,
        other_username, set_other_username        
      }}
    >
      {children}
    </Data_box.Provider>
  )  
};

export { Data_box , Data_provider }