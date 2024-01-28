import style from '../components/styles/ModalEdit.module.css'
import {useState, useEffect}from 'react'
import { useDispatch } from 'react-redux';
import {getAllUsers}from '../Redux/actions'
import {LoginForm,SignWindow} from '../Auth/AuthIndex';
import {useAuth}from '../Auth/AuthContext/AuthContext'


const Form = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
 useEffect(()=>{
   dispatch(getAllUsers())
 },[])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSignClick = () => {
    setIsModalOpen(true);
  };

  const handleSignWindowClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <LoginForm handleSignClick= {handleSignClick} auth={auth} />
      <div>
      {isModalOpen && <SignWindow onClose={handleSignWindowClose} auth = {auth}/>}
      </div>
     
    </div>
  )
}
export default Form;