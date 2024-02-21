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
 //?=============== Esta es la parte de las variantes ======================================================
  const proById = useSelector((state)=>state.detailProd)
  console.log(proById)

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  // Obtén las opciones únicas de tamaños y colores disponibles
  const uniqueSizes = [...new Set(Object.values(proById).map((variant) => variant.size))];
  const uniqueColors = [...new Set(Object.values(proById).map((variant) => variant.extras))];

  // Encuentra la variante seleccionada o usa el primer objeto (objeto 0) por defecto
  const selectedVariant =
    selectedSize && selectedColor
      ? Object.values(proById).find(
          (variant) => variant.size === selectedSize && variant.extras === selectedColor
        ) || Object.values(proById)[0]
      : Object.values(proById)[0];
//*Hasta aqui llega la parte de las variantes >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

 
  //const data2 = ParsedDetail(product)
  //console.log(data2)
  
  const puedeEditar = user && user.role === 0;
  //const status = statusUser(product.enable);
  //console.log('yo soy user '+user.id)
  
  return (
    <div className={style.body}>
      <div className={style.cont}>
        <br/>
        <br/>
      <div>
      <ParsedImages objeto = {selectedVariant}/>
      </div >
      <div className={style.text}>
        {puedeEditar &&puedeEditar?
        <GenericButton onClick={handleEditClick} buttonText='Editar' userEdit={product}/> : null}
        {isModalOpen && <EditWindow onClose={handleEditWindowClose} userEdit = {product}/>}
      <h2>{product?.name}</h2>
      <h3>$ : {selectedVariant.price}</h3>
      <h3>Genero: {product?.Genres}</h3> 
      <p>Descripcion: {product?.description}</p>
      <p>Marca: {product?.Trademarcks}</p>

       {/* Select dinámico para tamaños */}
       <select onChange={(e) => setSelectedSize(e.target.value)} value={selectedSize}>
        <option value="" disabled>
          Seleccione el Talle:
        </option>
        {uniqueSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      {/* Select dinámico para colores */}
      <select onChange={(e) => setSelectedColor(e.target.value)} value={selectedColor}>
        <option value="" disabled>
          Seleccione un Color:
        </option>
        {uniqueColors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
      
      <p>Stock: {selectedVariant.stock}</p>
      <h3>Caracteristicas: {selectedVariant.characteristics}</h3>
      <GenericButton onClick = {goBack} buttonText='Volver'/>
      </div>
      </div>
      </div>
    );
  }
  
  export default Detail;

  