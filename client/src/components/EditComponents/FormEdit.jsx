import { useState } from 'react';
import axios from 'axios'
import style from '../styles/Form.module.css';
import GenericButton from '../Buttons/GenericButton';
import CloudinaryUpload from './CloudinaryUpload';
//import { showSuccess, showError } from '../../Auth/HandlerError';


 const uplPreset= import.meta.env.VITE_PRESET

const FormEdit = ({ editedProd, onInputChange, onSaveChanges }) => {
  const [imageUrl, setImageUrl] = useState(editedProd.picture);
 
  const onImageChange = (url) => {
    setImageUrl(url);
    console.log(setImageUrl)
    onInputChange("picture", url);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveChanges();
  };
  
  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit}>
      <label>
          Caracteristicas:
          <input type="text" name="characteristics" value={editedProd.characteristics} onChange={handleInputChange} />
        </label>
        <label >
          {imageUrl && <img src={imageUrl} alt="Current User" />}
        </label>
        <CloudinaryUpload onImageChange={onImageChange}/>
        {/* <div>
        <label>
      <input type="file" onChange={handleImageUpload} />
        </label>
        </div> */}
        <label>
          Talle:
          <input type="text" name="size" value={editedProd.size} onChange={handleInputChange} />
        </label>
        <label>
          Orden:
          <input type="text" name="order" value={editedProd.order} onChange={handleInputChange} />
        </label>
        <label>
          Precio:
          <input type="text" name="price" value={editedProd.price} onChange={handleInputChange} />
        </label>
        <label>
          Stock:
          <input type="text" name="stock" value={editedProd.stock} onChange={handleInputChange} />
        </label>
        
        <label>
          Estado:
          <select name="enable" value={editedProd.enable} onChange={handleInputChange}>
            <option value={true}>Activo</option>
            <option value={false}>Bloqueado</option>
          </select>
        </label>
        <GenericButton type="submit" buttonText="Guardar cambios" />
      </form>
    </div>
  );
};

export default FormEdit;
