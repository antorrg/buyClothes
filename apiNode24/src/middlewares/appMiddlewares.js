
export default {
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
      errorEndWare : (err, req, res, next) => {
        const status = err.status || 500;
        const message = err.message || "Error interno del servidor";
        console.error(err);
        res.status(status).json({
            success: false,
            data: null,
            message,
        });
    }
}