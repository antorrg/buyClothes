import {Routes, Route} from 'react-router-dom'
import AdminPanel from './Views/AdminPanel'
import Users from './Views/Users'



const AdminApp = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<AdminPanel/>}/>
      <Route path='users' element={<Users/>}/>
    </Routes>
    </>
  )
}

export default AdminApp