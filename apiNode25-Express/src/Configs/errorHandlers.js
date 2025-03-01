
export default {
    catchController : (controller)=>{
        return (req, res, next)=>{
            return controller(req, res, next).catch(next);
        }
    },
    
    throwError : (message, status)=>{
        const error = new Error(message);
        error.status = status;
        throw error;
    },
    
    middError : (message, status)=>{
        const error = new Error(message);
        error.status = status;
        return error;
    },   
    
    corsConfig : (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization, x-access-token');
        res.header('Access-Control-Allow-Methods', ' GET, POST, OPTIONS, PUT, DELETE');
        next();
      },
      validJson : (err, req, res, next) => {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
          res.status(400).json({success: false, data: null, message: 'Invalid JSON format' });
        } else {
          next();
        }
      },
      errorEndWare : (error, req, res, next) => {
        const status = error.status || 500;
        const message = error.message || "Error interno del servidor";
        console.error(error);
        res.status(status).json({
            success: false,
            results:null,
            message,
        });
      }
    
    }