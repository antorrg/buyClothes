import React, { useState } from 'react';
import style from './ParsedImage.module.css'

const ParsedImages = ({ objeto }) => {
  const [imagenIndex, setImagenIndex] = useState(0);
  
  const renderizarImagenes = () => {
    if (objeto && objeto.images && objeto.images.length > 0) {

      const finalImg = objeto.images.length;
      

      return (
          <div>
            <button onClick={() => setImagenIndex(imagenIndex - 1)} disabled={imagenIndex === 0} className={style.button}>
              ⬅️
            </button>
            <button onClick={() => setImagenIndex(imagenIndex + 1)} disabled={imagenIndex === objeto.images.length - 1} className={style.button}>
             ➡️
            </button>
            <br/>
          <img src={objeto.images[imagenIndex]} alt={`Images ${imagenIndex + 1}`} className={style.image}/>
            <br/>
            <span>{imagenIndex+1} / {finalImg}</span>
          </div>
      );
    }else {
      return <p>No hay imágenes disponibles</p>;
    }
  };


  return (
   <>{renderizarImagenes()}</>
  );
};

export default ParsedImages;
