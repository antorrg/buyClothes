import style from './styles/Detail.module.css'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getRoleName, statusUser } from '../utils/RoleName'
import GenericButton from "../components/Buttons/GenericButton";
import EditWindow from "../components/EditComponents/ModalEdit";
import {productById, cleanData}from '../Redux/actions'
import { useAuth } from '../Auth/AuthContext/AuthContext';
import ParsedImages from '../components/ParsedImages/ParsedImages';


const Detail=()=>{
  const { user }=useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id}= useParams();
  const product = useSelector((state)=>state.prodById)
  console.log('soyDetail: '+product)

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

    dispatch(productById(id, token));

  },[dispatch,id, cleanData]);

  const userBI = product;
  const size = userBI.Sizes?.join(', ')
  const cat = userBI.Categories?.join(', ')

  const puedeEditar = user && user.role === 0;
  const status = statusUser(userBI.enable);
  //console.log('yo soy user '+user.id)
  
  return (
    <div className={style.body}>
      <div className={style.cont}>
        <br/>
        <br/>
      <div>
      <ParsedImages objeto = {userBI}/>
      </div >
      <div className={style.text}>
        {puedeEditar &&puedeEditar?
        <GenericButton onClick={handleEditClick} buttonText='Editar' userEdit={userBI}/> : null}
        {isModalOpen && <EditWindow onClose={handleEditWindowClose} userEdit = {userBI}/>}
      <h2>{userBI?.name}</h2>
      <h3>$ : {userBI?.price}</h3>
      <h3>Genero: {userBI?.genre}</h3> 
      <h3>Categoria: {cat}</h3>
      <h3>Talle: {size}</h3>
      <p>Descripcion: {userBI?.description}</p>
      <p>Stock: {userBI?.stock}</p>
      <h3>Caracteristicas: {userBI?.characteristics}</h3>
      <GenericButton onClick = {goBack} buttonText='Volver'/>
      </div>
      </div>
      </div>
    );
  }
  
  export default Detail;

  