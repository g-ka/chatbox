import { Routes, Route, useNavigate } from 'react-router-dom';
import Axios from './api/Axios';
import useData from './hooks/useData';
import Layout from './Layout';
import Auth_layout from './Auth_layout';
import Sign_up from './components/Sign_up';
import Sign_in from './components/Sign_in';
import Home from './components/Home';
import Req_sent from './components/Req_sent';
import Req_recieved from './components/Req_recieved';
import Connections from './components/Connections';
import Chat_box from './components/Chat_box';
import { useEffect, useState } from 'react';

function App() {

  const { set_auth } = useData();

  const [ is_loading, set_is_loading ] = useState(true);
  const [ err_msg, set_err_msg ] = useState('');

  const navigate = useNavigate();

  useEffect(() =>
  {
    const session_check_handler = async () =>
    { 
      try
      {
        const response = await Axios.get(
          '/session_check',
          {
            headers: { "Content-Type": 'application/json' },
            withCredentials: true
          }
        );

        if(response.status === 202)
        {
          const { username } = response.data; 
          set_auth({ username });
          navigate('/auth/');
        }
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

    session_check_handler();
  }, []);

  return (
    <>
      {
        is_loading ?
          <p className='initial_loading'>Loading...</p> :
            err_msg ?
              <p className='initial_error'>{err_msg}</p> :
                <Routes>
                  <Route path='/' element={<Layout />} >
            
                    {/* Public Routes */}
                    <Route path='/' element={<Sign_up />} />
                    <Route path='/sign_in' element={<Sign_in />} />
            
                    {/* Protected Routes */}   
                    <Route path='/auth' element={<Auth_layout />} >
                      <Route path='/auth/' element={<Home />} />    
                      <Route path='/auth/req_sent' element={<Req_sent />} />    
                      <Route path='/auth/req_recieved' element={<Req_recieved />} />    
                      <Route path='/auth/connections' element={<Connections />} />  
                      <Route path='/auth/chat_box' element={<Chat_box />} />  
                    </Route>
            
                  </Route>
                </Routes>
      } 
    </>       
  );
}

export default App;