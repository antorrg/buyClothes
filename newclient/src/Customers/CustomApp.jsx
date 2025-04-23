import {Routes, Route} from 'react-router-dom'
import CustomerHome from './Views/CustomerHome'
import CustomerDetail from './Views/CustomerDetail'

const CustomApp = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<CustomerHome/>}/>
      <Route path='/detail' element={<CustomerDetail/>}/>
    </Routes>
    </>
  )
}

export default CustomApp