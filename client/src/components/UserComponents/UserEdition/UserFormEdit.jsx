import { useState } from 'react';
import axios from 'axios'
import style from '../../styles/Form.module.css';
import GenericButton from '../../Buttons/GenericButton';
import CloudinaryUpload from '../../EditComponents/CloudinaryUpload';
//import { showSuccess, showError } from '../../Auth/HandlerError';


 const uplPreset= import.meta.env.VITE_PRESET

const FormEdit2 = ({ editedUser, onInputChange, onSaveChanges }) => {
  const [imageUrl, setImageUrl] = useState(editedUser.picture);
 
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
  // const handleImageUpload = async (event) => {
  //   const image = event.currentTarget.files[0];
   
  //   if (image) {
  //     const formData = new FormData();
  //     formData.append('file', image);
  //     formData.append('upload_preset', uplPreset);

  //     try {
  //       const response = await axios.post(
  //         "https://api.cloudinary.com/v1_1/dt1lpgumr/image/upload",
  //         formData
  //       );

  //       if (!response.status === 200) {
  //         console.error('Error al cargar la imagen');
  //         showError("No fue posible cargar la imagen");
  //       } else {
  //         console.log('Imagen nueva:', response.data.secure_url);
  //         let newImage=response.data.secure_url
  //         onImageChange(newImage);
  //         console.log(newImage)
  //         showSuccess("Imagen cargada con éxito");
  //       }
  //     } catch (error) {
  //       console.error('Error al cargar la imagen:', error);
  //       showError("No fue posible cargar la imagen");
  //     }
  //     console.log(onImageChange);
  //   }
  // };
  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit}>
        <label>
          {imageUrl && <img src={imageUrl} alt="Current User" />}
        </label>
        <CloudinaryUpload onImageChange={onImageChange}/>
        {/* <div>
        <label>
      <input type="file" onChange={handleImageUpload} />
        </label>
        </div> */}
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
            <option value ={3}>Proveedor</option>
          </select>
        </label>
        <label>
          Estado:
          <select name="enable" value={editedUser.enable} onChange={handleInputChange}>
            <option value={true}>Activo</option>
            <option value={false}>Bloqueado</option>
          </select>
        </label>
        <GenericButton type="submit" buttonText="Guardar cambios" />
      </form>
    </div>
  );
};

export default FormEdit2;

// const FormEdit = ({ editedUser, onInputChange,onSaveChanges}) => {
//     const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       onInputChange(name, value);
//       console.log(onImageChange)
//     };
//     const [imageUrl, setImageUrl] = useState('');
//     const url=imageUrl;
//     const onImageChange = (url) => {
//       setImageUrl(url);
//     };
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       onSaveChanges();
//     };

//   return (
//     <div className={style.formContainer}>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Imagen:
//           <CloudinaryUpload type= 'file' value = {editedUser.picture} onImageChange={onImageChange}/>
//         </label>
//         <label>
//           Nombre:
//           <input type="text" name="name" value={editedUser.name} onChange={handleInputChange} />
//         </label>
//         <label>
//           Apellido:
//           <input type="text" name="surname" value={editedUser.surname} onChange={handleInputChange} />
//         </label>
//         <label>
//           País:
//           <input type="text" name="country" value={editedUser.country} onChange={handleInputChange} />
//         </label>
//         <label>
//           Rol:
//           <select name="role" value={editedUser.role} onChange={handleInputChange}>
//             <option value={0}>Admin</option>
//             <option value={1}>Usuario</option>
//             <option value={2}>Moderador</option>
//           </select>
//         </label>
//         <label>
//           Estado:
//           <select name="enable" value={editedUser.enable} onChange={handleInputChange}>
//             <option value={true}>Activo</option>
//             <option value={false}>Bloqueado</option>
//           </select>
//         </label>
//         <GenericButton type= 'submit' buttonText='Guardar cambios'/>
//       </form>
//     </div>
//   );
// };

// export default FormEdit;
