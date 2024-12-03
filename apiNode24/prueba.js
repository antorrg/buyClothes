import fs from 'fs'
import path from 'path'


//     const fs = require('fs');
// const path = require('path');

/**
 * Función para escribir una URL en un archivo de texto existente.
 * @param {string} url - La URL a escribir en el archivo.
 * @param {string} filePath - Ruta del archivo donde se escribirá la URL.
 */
function escribirUrlEnArchivo(url, filePath) {
  const rutaCompleta = path.resolve(filePath);

  // Asegurarse de que el archivo existe o crearlo
  fs.appendFile(rutaCompleta, `${url}\n`, (err) => {
    if (err) {
      console.error('Error al escribir en el archivo:', err);
    } else {
      console.log(`URL escrita correctamente en ${rutaCompleta}`);
    }
  });
}

// Ejemplo de uso
const url = 'https://example.com';
const archivo = 'urls.txt';

//escribirUrlEnArchivo(url, archivo);
escribirUrlEnArchivo('https://perico.com', 'urls.txt')