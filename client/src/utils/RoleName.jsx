// Función para obtener el nombre del rol basado en el número
const getRoleName = (roleNumber) => {
    switch (roleNumber) {
      case 0:
        return 'Admin';
      case 1:
        return 'Usuario';
      case 2:
        return 'Moderador';
      case 3:
        return 'Proveedor';
      default:
        return 'Desconocido';
    }
  };
  const statusUser = (data) => {
    switch (data) {
      case false:
        return '¡¡Usuario bloqueado!!';
      default:
        return 'Se encuentra activo';
    }
  }

  export {
    getRoleName,
    statusUser 
  };
  // Uso de la función en tu componente
  //const roleName = getRoleName(user.rol);
  
  // Luego, puedes utilizar `roleName` donde necesites mostrar el nombre del rol.
  