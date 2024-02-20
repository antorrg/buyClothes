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
import ParsedDetail from '../utils/ParsedDetail'


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

 
  const data2 = ParsedDetail(product)
  console.log(data2)
  
  const puedeEditar = user && user.role === 0;
  //const status = statusUser(product.enable);
  //console.log('yo soy user '+user.id)
  
  return (
    <div className={style.body}>
      <div className={style.cont}>
        <br/>
        <br/>
      <div>
      {/* <ParsedImages objeto = {userB}/> */}
      </div >
      <div className={style.text}>
        {puedeEditar &&puedeEditar?
        <GenericButton onClick={handleEditClick} buttonText='Editar' userEdit={product}/> : null}
        {isModalOpen && <EditWindow onClose={handleEditWindowClose} userEdit = {product}/>}
      <h2>{product?.name}</h2>
      {/* <h3>$ : {product?.Product1s[0].price}</h3> */}
      <h3>Genero: {product?.Genres}</h3> 
      {/* <h3>Categoria: {cat}</h3> */}
      {/* <h3>Talle: {product.Product1[0].size}</h3> */}
      <p>Descripcion: {product?.description}</p>
      <p>Marca: {product?.Trademarcks}</p>
      {/* <p>Stock: {productoOrden1.stock}</p>
      <h3>Caracteristicas: {productoOrden1.characteristics}</h3> */}
      <GenericButton onClick = {goBack} buttonText='Volver'/>
      </div>
      </div>
      </div>
    );
  }
  
  export default Detail;

  