import Cards from '../components/Cards'
import  Navbar  from '../components/Navbar';
import { useAuth } from '../Auth/AuthContext/AuthContext';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllProducts}from '../Redux/actions'
import Pagination from '../components/Pagination';
import Loading from '../components/Loading'
//import userInfo from '../utils/infoParsed';

function Home() {
  const {authenticated, user, logout}=useAuth();
    const loading = useSelector((state)=>state.loading)
    const totalPages = useSelector((state)=>state.totalPages)
   const pages = useSelector((state)=>state.currentPage)
   const guide = pages? pages: 1;
    const [page, setPage]= useState(Number(guide))
  
  const products = useSelector((state)=>state.products)
  const char = products
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(getAllProducts (page))
  },[dispatch, page])

  
    return (
      <div >
        <Navbar/>
        {loading? 
        <Loading/>:
        <>
        {/* <Pagination page={page} setPage={setPage} totalPages={totalPages} position={true}/> */}
        <Cards character = {char}/>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} position={false} />
        </>}
      </div>
    );
  }
  
  export default Home;
  

  