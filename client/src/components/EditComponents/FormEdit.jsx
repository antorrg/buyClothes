import { useState } from 'react';
import style from '../styles/Form.module.css'
import GenericButton from '../Buttons/GenericButton';
import CloudinaryUpload from './CloudinaryUpload';


const FormEdit = ({ editedUser, onInputChange,onSaveChanges}) => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      onInputChange(name, value);
      console.log(onImageChange)
    };
    const [imageUrl, setImageUrl] = useState('');
    const url=imageUrl;
    const onImageChange = (url) => {
      setImageUrl(url);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      onSaveChanges();
    };

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit}>
        <label>
          Imagen:
          <CloudinaryUpload onImageChange={onImageChange}/>
        </label>
        <label>
          Nombre:
          <input type="text" name="name" value={editedUser.name} onChange={handleInputChange} />
        </label>
        <label>
          Apellido:
          <input type="text" name="surname" value={editedUser.surname} onChange={handleInputChange} />
        </label>
        <label>
          País:
          <input type="text" name="country" value={editedUser.country} onChange={handleInputChange} />
        </label>
        <label>
          Rol:
          <select name="role" value={editedUser.role} onChange={handleInputChange}>
            <option value={0}>Admin</option>
            <option value={1}>Usuario</option>
            <option value={2}>Moderador</option>
          </select>
        </label>
        <label>
          Estado:
          <select name="enable" value={editedUser.enable} onChange={handleInputChange}>
            <option value={true}>Activo</option>
            <option value={false}>Bloqueado</option>
          </select>
        </label>
        <GenericButton type= 'submit' buttonText='Guardar cambios'/>
      </form>
    </div>
  );
};

export default FormEdit;
