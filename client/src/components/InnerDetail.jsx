import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ParsedImages from './ParsedImages/ParsedImages';
import GenericSelect from './SubCompDetail/GenericSelect/GenericSelect';
import {getSize, getColor} from '../Redux/actions'

const InnerDetail = ({proById}) => {
    const product = useSelector((state) => state.detailProd);

   
  
    // Obtén las opciones únicas de tamaños y colores disponibles
    const uniqueSizes = [
      ...new Set(Object.values(proById).map((variant) => variant.size)),
    ];
    const uniqueColors = [
      ...new Set(Object.values(proById).map((variant) => variant.extras)),
    ];
  
    //Encuentra la variante seleccionada o usa el primer objeto (objeto 0) por defecto
   // const selectedVariant = Object.values(product)? Object.values(product) : Object.values(product)[0];
    const selectedVariant = product? Object.values(product)[0] : null;
  return (
    
    <div>
    <div>
    <ParsedImages objeto = {selectedVariant && selectedVariant}/>
    </div>
    <div>
      <br></br>
    <h3>$ : {selectedVariant?.price}</h3>
    <GenericSelect items={uniqueSizes} functionProp={getSize} itemText={'Seleccione un talle:'}  />
    <GenericSelect items={uniqueColors} functionProp={getColor} itemText={'Seleccione un color:'}/>
     <p>Stock: {selectedVariant?.stock}</p> 
    <p>Caracteristicas: {selectedVariant?.characteristics}</p>
    <p>Id: {selectedVariant?.id}</p>
    <p>Order: {selectedVariant?.order}</p>
    </div>
    </div>
    
  )
}

export default InnerDetail