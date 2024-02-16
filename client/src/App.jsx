//Dependencies:
import { useAuth } from './Auth/AuthContext/AuthContext'
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import {useDispatch}from 'react-redux';
//Componentes:
import {Landing, Detail, Home, Form, Error} from './views/Index';
import { AdminHome, AdminPanel, AdminDetail } from './views/AdminIndex';
import './App.css';
import { interceptor } from './Auth/axiosUtils'
import {loginUser, isNotAuth} from './Redux/actions'

function App() { 
  const {authenticated, user,logout}=useAuth();

  const dispatch = useDispatch();
  console.log(authenticated)
  const allow = user? user.role : 1;
  console.log(allow)
  const navigate = useNavigate()
  useEffect(()=>{
    if(authenticated){
      dispatch(loginUser(user))
    }else{
      dispatch(isNotAuth())
    }
  },[authenticated]);

 useEffect(()=>{
  interceptor(logout);
  navigate('/')
 },[])

  


  return (
    <div className={App}>
  
  <Routes>
     
        <Route path="/home" element= {authenticated ? <Home/>: <Navigate to = '/'/>} />
        <Route path="/home/:id" element={authenticated? <Detail /> : <Navigate to="/"/>} />
        <Route path= "/admin" element={(authenticated && allow === 0) || (authenticated && allow === 2) ? <AdminHome/> : <Navigate to="/home"/>}/>
        <Route path= "/admin/:id" element={authenticated  && allow===2  || allow===0 ? <AdminDetail/> : <Navigate to="/home"/>}/>
        <Route path="/" element={<Landing/>} />
        <Route path="/form" element={<Form />} />
        <Route path= "*" element = {<Error/>}/>
     
        
      </Routes>

      </div>
      );
 
}

export default App;

