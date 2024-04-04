
function defaultPass (data) {
    // Validar que el string tenga al menos 8 caracteres
    if (data.length < 8) {
      return "El string debe tener al menos 8 caracteres";
    }
  
    // Obtener los valores de los índices 2 al 8
    const valores = data.slice(4, -1);
  
    // Agregar las letras "Bh" al principio
    const resultado = `Bh${valores}`;
  
    return resultado;
  }
  
  const str = "20231279874";
  
  const resultado = defaultPass(str);
  
  console.log(resultado); 

//El problema con esta funcion es que si es el dni habria que trabajar de una 
//manera diferente el slice que si es el cuit/cuil.
//Las letras "Bh" hace alusion a Boscarol hnos.