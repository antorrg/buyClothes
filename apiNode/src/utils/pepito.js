// Middleware para verificar roles
const checkRoles = (allowedRoles) => {
    return (req, res, next) => {
      // Verificar si el usuario tiene al menos uno de los roles permitidos
      const userRoles = req.user.roles; // Supongamos que los roles del usuario están en req.user.roles
  
      const intersection = allowedRoles.filter(role => userRoles.includes(role));
  
      if (intersection.length > 0) {
        // El usuario tiene al menos uno de los roles permitidos
        next();
      } else {
        // El usuario no tiene los roles permitidos
        return res.status(403).json({ message: 'No tienes los roles necesarios para acceder a este recurso.' });
      }
    };
  };
  
  // Uso del middleware con roles permitidos
  app.get('/ruta-protegida', checkRoles(['admin', 'moderator']), (req, res) => {
    // Acción que solo puede realizar un usuario con roles 'admin' o 'moderator'
    res.json({ message: 'Acceso permitido para roles especificados.' });
  });
  