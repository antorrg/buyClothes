import CardsUser from '../../components/UserComponents/CardsUser'
import { useAuth } from '../../Auth/AuthContext/AuthContext';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllUsers}from '../../Redux/actions'
import GenericButton from '../../components/Buttons/GenericButton';
import {Link}from 'react-router-dom'
//import CloudinaryUpload from '../../components/EditComponents/CloudinaryUpload';

function AdminHome() {
  const {authenticated, user}=useAuth();
  //console.log(authenticated)
  //console.log('user: '+user)
  
  const users = useSelector((state)=>state.allUsers)
  const char = users
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllUsers())
  },[dispatch])

  
    return (
      <div >
        <h1>Soy el Home pero del Admin</h1>
        <Link to ={'/home'}>
        <GenericButton buttonText='Home'/>
        </Link>
        <CardsUser character = {char}/>
      </div>
    );
  }
  
  export default AdminHome;
  