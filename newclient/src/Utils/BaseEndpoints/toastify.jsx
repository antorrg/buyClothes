import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
 
 // errorHandler.js
  const handleError = (error) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data.error;
      toast.error(`Error ${status}. ${data}`);
    } else if(error.request) {
      // La solicitud fue realizada pero no se recibió respuesta
      toast.error('No se recibió respuesta del servidor.');
      //alert('No se recibió respuesta del servidor. Por favor, inténtalo de nuevo más tarde.');
     } else {
    // Error durante la configuración de la solicitud
    toast.error('Ocurrió un error, intente nuevamente mas tarde.');
    }
  };



const showSuccess = (mensaje) => {
  toast.success(mensaje, {
    //position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
    
  });
};

const showError = (mensaje) => {
  toast.error(mensaje, {
    //position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
   
  });
};
const showInfo = (mensaje) => {
  toast.info(mensaje, {
    //position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
    
  });
};
const showWarn = (mensaje) => {
  toast.warn(mensaje, {
    //position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
    
  });
};
const showWarnWithTime = (mensaje, time=null) => {
  toast.warn(mensaje, {
    //position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: time||false,
   
  });
};
export {
    handleError,
    showError,
    showInfo,
    showSuccess,
    showWarn,
    showWarnWithTime
};