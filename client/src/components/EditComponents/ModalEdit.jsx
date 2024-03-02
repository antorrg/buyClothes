import { useState } from 'react';
import {useSelector} from 'react-redux'
import style from '../styles/ModalEdit.module.css'
import FormEdit from './FormEdit';
import axios from 'axios'
import GenericButton from '../Buttons/GenericButton';
import {showError, showSuccess,HandlError}from '../../Auth/HandlerError';


const EditWindow = ({ onClose, }) => {
  const productEdit = useSelector((state)=> state.detailProd)

  const {id, order,characteristics, images, size, price, stock, enable}= productEdit;
  console.log('A: '+id)
  console.log('orden: '+order)
  console.log ('A: '+characteristics)
  console.log ('A: '+price)
  //console.log (picture)
  console.log (stock)
  console.log (enable)

  const [editedProd, setEditedProd] = useState({
    id, 
    order,
    characteristics, 
    images, 
    size,
    price, 
    stock, 
    enable
  });

  const handleInputChange = (name, value) => {
    // console.log('name: ', name);
    // console.log('value: ', value);
    // console.log('picture: ', picture)
    const processedValue = name === 'enable' ? value === 'true' : value;
    setEditedProd((prevProd) => ({
      ...prevProd,
      [name]: processedValue,
    }));
  };

  const handleSaveChanges = async () => {
    

    //Lógica para guardar los cambios (puedes conectarlo a tus acciones de Redux)
    try {
      // Realiza la solicitud PUT con Axios
      const response = await axios.put(`/depend/${id}`,editedProd);
      
      if (response.status === 200) {
        showSuccess('Producto actualizado con éxito')
        //alert('Producto actualizado con éxito');
       onClose(); // Cierra el modal después de guardar los cambios
      } else {
        showError('Error al actualizar el Producto')
        //alert('Error al actualizar el Producto');
      }
    } catch (error) {
      HandlError({error:error.message})
      console.error('Error al actualizar el producto:', error);
     
    }
  };
  
 

  return (
    <div className={style.modal}>
      <h2>Editar Producto</h2>
      <FormEdit id = {id} editedProd={editedProd} onInputChange={handleInputChange} onSaveChanges={handleSaveChanges} />
      <GenericButton onClick= {onClose} buttonText='Cancelar'/>
    </div>
  );
};

export default EditWindow;
