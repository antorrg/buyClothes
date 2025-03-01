import {Routes, Route, Navigate, useNavigate, Outlet}from 'react-router-dom'
import {useAuth} from './Auth/AuthContext/AuthContext'
import { useEffect, useCallback, useState } from 'react'
import interceptor from './interceptor'
import ProtectedRoute from './ProtectedRoutes'
// import * as View from './views/Index'
// import * as Ad from './views/AdminViews/AdminIndex'
//import SessionWarning from './Auth/AuthContext/SessionWarning'

function App() {
  const {authenticated, logout, expirationTime}= useAuth()
  const navigate = useNavigate()

 
 const redirectToError = useCallback((status, message) => {
  navigate('/error', { state: { status, message }})
}, [navigate])

 useEffect(()=>{
  interceptor(logout, 
    redirectToError//(status, message) => navigate('/error', { state: { status, message }})
)
 },[logout, redirectToError])



  return (
    <div>
    {/* <SessionWarning expirationTime={expirationTime}/>
    <Routes>
      <Route path='/' element={<View.Landing />}/>
      <Route path='/detalle/:id' element={<View.Detail/>}/>
      <Route path='/detalle/item/:id' element={<View.Item/>}/>
      <Route path='/contacto' element={<View.Contact/>}/>
      <Route path='/acerca' element={<View.About/>}/>
      <Route path='/nuestro-trabajo' element={<View.OurWork/>}/>
      <Route path='/videos' element={<View.Videos/>}/>
      <Route path='/admin' element={
        <ProtectedRoute>
        <View.Admin />
      </ProtectedRoute>
      }>
        <Route  index element={<Ad.TabsPage/>} />
        <Route path='/admin/product' element={<Ad.ProductComp/>}/>
        
      </Route>
      <Route path='/login' element={<View.Login/>}/>
      <Route path='/error' element={<View.Error/>}/>
      <Route path='*' element={<View.Error  state={{ status: 404, message: "Página no encontrada" }}/>}/>
    </Routes> */}
    </div>
  )
}

export default App
