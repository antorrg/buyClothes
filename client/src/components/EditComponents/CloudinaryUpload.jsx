import React, { useState } from 'react';
import axios from 'axios'
import { showSuccess, showError } from '../../Auth/HandlerError';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';
const uplPreset= import.meta.env.VITE_PRESET

const CloudinaryUpload = ({ onImageChange }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uplPreset);  // Reemplaza 'tu_upload_preset' con tu propio valor

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dt1lpgumr/image/upload",  // Reemplaza 'tu_cloud_name' con tu propio valor
          formData
        );
  
        if (response.status === 200) {
          console.log('Imagen cargada con éxito:', response.data.secure_url);
          setImageUrl(response.data.secure_url);
          showSuccess("Imagen cargada con éxito");
          onImageChange(response.data.secure_url);
        } else {
          console.error('Error al cargar la imagen');
          showError("No fue posible cargar la imagen");
        }
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
        showError("No fue posible cargar la imagen");
      }
    }
  };
  const handleSendImage =(event)=>{
    handleImageUpload(event)
  }

  return (
    <div>
      <input type="file" onChange={handleSendImage} />
      {imageUrl && (
         <CloudinaryContext cloudName="dt1lpgumr">  
         {/* // Reemplaza 'tu_cloud_name' con tu propio valor */}
          <Image publicId={imageUrl} width="150" crop="scale">
            <Transformation quality="auto" fetchFormat="auto" />
          </Image>
        </CloudinaryContext>
      )}
      {/* <GenericButton buttonText={'Subir imagen'} onClick={handleSendImage}/> */}
    </div>
  );
};

export default CloudinaryUpload;
