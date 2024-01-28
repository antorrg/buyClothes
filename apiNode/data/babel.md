# Babel en Node.js

Para trabajar con importaciones de ECMAScript 6 (ES6) en lugar de CommonJS en tu servidor de Express con Node.js, necesitarás configurar Babel para transpilar tu código. Aquí hay una guía paso a paso y las dependencias necesarias:

Instala Babel y sus dependencias:

```javascript
npm install @babel/core @babel/preset-env @babel/node --save-dev @babel/node nodemon --save-dev

```
@babel/core: El núcleo de Babel.
@babel/preset-env: Un conjunto de presets que permite utilizar las últimas características de JavaScript.
@babel/node: Permite usar Babel con el comando node para ejecutar archivos directamente.
@babel/node nodemon --save-dev: Permite usa Babel con el comando nodemon para ejecutar archivos con nodemon en desarrollo.
Crea un archivo de configuración para Babel:

Crea un archivo llamado .babelrc en la raíz de tu proyecto y agrega el siguiente contenido:

```javascript
{
  "presets": ["@babel/preset-env"]
}

```
Este archivo indica a Babel que utilice el preset @babel/preset-env para transpilar tu código.

Actualiza el script de inicio en tu archivo package.json:

Modifica el script que ejecuta tu aplicación para usar @babel/node. Actualiza la sección de "scripts" en tu package.json:
```javascript

"scripts": {
  "start": "babel-node tu_archivo_de_inicio.js",
  "dev": "nodemon --exec babel-node tu_archivo_de_inicio.js"
}


```
Asegúrate de reemplazar tu_archivo_de_inicio.js con el nombre de tu archivo de entrada principal.

Configura tu archivo de inicio para importaciones ES6:

En tu archivo de inicio (tu_archivo_de_inicio.js), utiliza la sintaxis de importación de ES6. Por ejemplo:
```javascript
// Reemplaza esto
// const express = require('express');

// Con esto
import express from 'express';

```
Asegúrate de hacer lo mismo en cualquier otro archivo que utilice importaciones ES6.

Ejecuta tu aplicación:

Ahora, deberías poder ejecutar tu aplicación usando el script configurado en el paso 3:

```javascript
npm start

```
Babel transpilará automáticamente tu código ES6 a JavaScript compatible con la versión de Node.js que estás utilizando.

Ten en cuenta que Babel también te permite personalizar la configuración según tus necesidades. Este ejemplo proporciona una configuración básica para empezar.
