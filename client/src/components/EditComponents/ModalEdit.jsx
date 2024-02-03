import { useState } from 'react';
import style from '../styles/ModalEdit.module.css'
import FormEdit from './FormEdit';
import axios from 'axios'
import GenericButton from '../Buttons/GenericButton';
import {showError, showSuccess,HandlError}from '../../Auth/HandlerError';


const EditWindow = ({ onClose, userEdit}) => {
  const {id, name,surname, country, role, enable, picture}= userEdit;
  //console.log('A: '+id)
  //console.log ('A: '+name)
  //console.log ('A: '+surname)
  console.log (picture)
  //console.log (role)
  //console.log (enable)

  const [editedUser, setEditedUser] = useState({
    name,
    picture,
    surname,
    country,
    role,
    enable,
  });

  const handleInputChange = (name, value) => {
    console.log('name: ', name);
    console.log('value: ', value);
    console.log('picture: ', picture)
    const processedValue = name === 'enable' ? value === 'true' : value;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: processedValue,
    }));
  };

  const handleSaveChanges = async () => {
    // console.log('B id: '+id)
    // console.log('B user: '+editedUser.name)
    // console.log('B user: '+editedUser.surname)
    // console.log(editedUser.country)
    // console.log(editedUser.role)
    // console.log(editedUser.enable)
    console.log(editedUser.picture)
    //Lógica para guardar los cambios (puedes conectarlo a tus acciones de Redux)
    try {
      // Realiza la solicitud PUT con Axios
      const response = await axios.put(`/user/update/${id}`,editedUser);
      
      if (response.status === 200) {
        showSuccess('Usuario actualizado con éxito')
        //alert('Usuario actualizado con éxito');
       onClose(); // Cierra el modal después de guardar los cambios
      } else {
        showError('Error al actualizar el usuario')
        //alert('Error al actualizar el usuario');
      }
    } catch (error) {
      HandlError({error:error.message})
      console.error('Error al actualizar el usuario:', error);
      //alert('Error al actualizar el usuario');
    }
  };
  
 

  return (
    <div className={style.modal}>
      <h2>Editar Usuario</h2>
      <FormEdit id = {id} editedUser={editedUser} onInputChange={handleInputChange} onSaveChanges={handleSaveChanges} />
      <GenericButton onClick= {onClose} buttonText='Cancelar'/>
    </div>
  );
};

export default EditWindow;
