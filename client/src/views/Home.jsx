import Cards from '../components/Cards'
import  Navbar  from '../components/Navbar';
import { useAuth } from '../Auth/AuthContext/AuthContext';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllUsers}from '../Redux/actions'
import GenericButton from '../components/Buttons/GenericButton';
import {Link}from 'react-router-dom'

function Home() {
  const {authenticated, user, logout}=useAuth();
  console.log(authenticated)
  console.log('user: '+user)
  
  const users = useSelector((state)=>state.allUsers)
  const char = users
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllUsers())
  },[dispatch])

  
    return (
      <div >
        <Navbar/>
        
        <Cards character = {char}/>
      </div>
    );
  }
  
  export default Home;
  

  