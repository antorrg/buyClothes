import React, { useState } from 'react';
import style from './ParsedImage.module.css'

const ParsedImages = ({ objeto }) => {
  const [imagenIndex, setImagenIndex] = useState(0);
  
  const renderizarImagenes = () => {
    if (objeto.images && objeto.images.length > 0) {

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
    } else {
      return <p>No hay imágenes disponibles</p>;
    }
  };


  return (
   <>{renderizarImagenes()}</>
  );
};

export default ParsedImages;



//typeof objeto.Sizes === 'string'

/*//   const renderizarTexto = () => {
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
//   };*/