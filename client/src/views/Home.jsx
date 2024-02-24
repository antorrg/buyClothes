import Cards from '../components/Cards'
import  Navbar  from '../components/Navbar';
import { useAuth } from '../Auth/AuthContext/AuthContext';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllProducts}from '../Redux/actions'
//import userInfo from '../utils/infoParsed';

function Home() {
  const {authenticated, user, logout}=useAuth();
  //console.log(authenticated)
  //console.log('user: '+user)
  const products = useSelector((state)=>state.products)
  const char = products
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   if(authenticated){
  //     dispatch(loginUser(user))
  //   }else{
  //     dispatch(isNotAuth)
  //   }
  // },[authenticated]);

  useEffect(()=>{
    dispatch(getAllProducts ())
  },[dispatch])

  
    return (
      <div >
        <Navbar/>
        <Cards character = {char}/>
      </div>
    );
  }
  
  export default Home;
  

  