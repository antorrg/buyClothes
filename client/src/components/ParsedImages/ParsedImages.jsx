import React, { useState } from 'react';
import style from './ParsedImage.module.css'
const ParsedImages = ({ objeto }) => {
  const [imagenIndex, setImagenIndex] = useState(0);
  console.log(objeto.Images)
  
  const renderizarImagenes = () => {
    if (objeto.Images && objeto.Images.length > 0) {

      const finalImg = objeto.Images.length;
      

      return (
        <div>
          <img src={objeto.Images[imagenIndex]} alt={`Imagen ${imagenIndex + 1}`} className={style.image}/>
          <div>
            <button onClick={() => setImagenIndex(imagenIndex - 1)} disabled={imagenIndex === 0}>
              ⬅️
            </button>
            <span>Imagen {imagenIndex+1} de {finalImg}</span>
            <button onClick={() => setImagenIndex(imagenIndex + 1)} disabled={imagenIndex === objeto.Images.length - 1}>
             ➡️
            </button>
          </div>
        </div>
      );
    } else {
      return <p>No hay imágenes disponibles</p>;
    }
  };

//   const renderizarTexto = () => {
//     if (objeto.Sizes && typeof objeto.Sizes === 'string' && objeto.Talles.trim() !== '') {
//       const talles = objeto.Sizes.split(',').map((talle, index) => <p key={index}>{talle.trim()}</p>);
//       return <div>{talles}</div>;
//     }else if(objeto.Sizes && typeof objeto.Sizes === 'string'){
//         const talles = objeto.Sizes.map((talle, index) => <p key={index}>{talle}</p>);
//         return <div>{talles}</div>;
//     } else {
//       return <p>No hay información de talles disponible</p>;
//     }
//   };
// const renderizarTexto = () => {
//     if (objeto.Sizes && Array.isArray(objeto.Sizes) && objeto.Sizes.length > 0) {
//       return (
//         <div>
//           <h2>Talles:</h2>
//           {objeto.Sizes.map((talle, index) => (
//             <p key={index}>{talle}</p>
//           ))}
//         </div>
//       );
//     } else {
//       return <p>No hay información de talles disponibles</p>;
//     }
//   };

  return (
    <div>
      <h2>Imágenes:</h2>
      {renderizarImagenes()}
    </div>
  );
};

export default ParsedImages;
//typeof objeto.Sizes === 'string'