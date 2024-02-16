import style from '../styles/Detail.module.css'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getRoleName, statusUser } from '../../utils/RoleName'
import GenericButton from "../../components/Buttons/GenericButton";
import EditWindow from "../../components/EditComponents/ModalEdit";
import {getById, cleanData}from '../../Redux/actions'
import { useAuth } from '../../Auth/AuthContext/AuthContext';


const AdminDetail=()=>{
  const { user }=useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id}= useParams();
  const userById = useSelector((state)=>state.detailUsers)

  const goBack = () => {
    navigate(-1);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleEditWindowClose = () => {
    setIsModalOpen(false);
  };

 const token = localStorage.getItem('validToken')

  useEffect(()=>{
    dispatch(cleanData());

    dispatch(getById(id, token));

  },[dispatch,id, cleanData]);

  const userBI = userById;
  const puedeEditar = user && user.role === 0;
  const roleName = getRoleName(userBI.role);
  const status = statusUser(userBI.enable);
  //console.log('yo soy user '+user.id)
  
    return (
      <div className={style.body}>
      <div className={style.cont}>
      <div>
      <img  className={style.image} src={userBI?.picture} alt = {'not found'}/>
      </div >
      <div className={style.text}>
      <GenericButton onClick = {goBack} buttonText='Volver'/>
      <h2>Email: {userBI?.email}</h2>
      <h3>Usuario: {userBI?.nickname}</h3>
      <h3>Nombre: {userBI?.name}</h3>
      <h3>Apellido: {userBI?.surname}</h3>
      <h3>Rol: {roleName}</h3>
      <h3>Pais: {userBI?.country}</h3>
      <h3>Estado: {status}</h3>
      {puedeEditar &&puedeEditar?
      <GenericButton onClick={handleEditClick} buttonText='Editar' userEdit={userBI}/> : null}
      {isModalOpen && <EditWindow onClose={handleEditWindowClose} userEdit = {userBI}/>}
      </div>
      </div>
      </div>
    );
  }
  


  export default AdminDetail;