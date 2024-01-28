//Dependencies:
import { useAuth } from './Auth/AuthContext/AuthContext'
import {Routes, Route, Navigate} from 'react-router-dom';
//Componentes:
import {Landing, Detail, Home, Form, Error} from './views/Index';
import { AdminHome,  } from './views/AdminIndex';
import './App.css';

function App() {
  const {authenticated, user}=useAuth();
  console.log(authenticated)
  const allow = user? user.role : 1;
  console.log(allow)
 



  return (
    <div className={App}>
  
  <Routes>
     
        <Route path="/home" element= {authenticated ? <Home/>: <Navigate to = '/'/>} />
        <Route path="/home/:id" element={authenticated? <Detail /> : <Navigate to="/"/>} />
        <Route path= "/admin" element={(authenticated && allow === 0) || (authenticated && allow === 2) ? <AdminHome/> : <Navigate to="/home"/>}/>
        {/* <Route path= "/admin/:id" element={authenticated  && allow===2  && allow===0 ? <Detail/> : <Navigate to="/home"/>}/> */}
        <Route path="/" element={<Landing/>} />
        <Route path="/form" element={<Form />} />
        <Route path= "*" element = {<Error/>}/>
     
        
      </Routes>

      </div>
      );
 
}

export default App;

