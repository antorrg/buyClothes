# Api apiBC2025 de Express

Base para el proyecto apiBC2025 de Express.js con entornos de ejecución y manejo de errores.

## Sobre la API

Esta API fue construida con un enfoque **híbrido**.
La capa de **Repositories**, **Services** y **Controllers** está desarrollada bajo el paradigma **POO** (Programación Orientada a Objetos).
Sin embargo, los **routers** y la aplicación en sí misma no siguen estrictamente este patrón.

---

## Cómo comenzar

Puedes ejecutar la aplicación con:

* `npm run dev` → modo desarrollo
* `npm start` → modo producción

⚠️ Los tests solo podrán ejecutarse luego de haber declarado los modelos y conectado la base de datos.

Necesitarás **dos bases de datos**: una para desarrollo y otra para test.
Cuando todo esté listo, podrás correr los **tests unitarios** (ubicados en `test/Configs` y en `test/Shared/Auth`, `test/Shared/Repositories` y `test/Shared/Services`).
Cada test unitario se encuentra junto al archivo que valida, y en la carpeta `test/Features/user` se encuentra el **test de integración** de `User`.

---

## Base de datos

La aplicación está preparada para trabajar con **Sequelize** con base de datos **Postgres**.
Para inicializar Sequelize:

Crear dos bases de datos (minimo), una para pruebas y otra para desarrollo

---

## Resumen de pasos iniciales

1. Crear y conectar las bases de datos
2. Comandos útiles:

   * `npm run unit:test nombreTest` → Ejecuta un test unitario
   * `npm run lint` → Ejecuta el linter
   * `npm run gen:schema` → Genera documentación Swagger de los endpoints
   * `npm run validate:schemas` → Genera esquemas de validación para cada ruta

---

## Manejo de errores

* **`catchController`**: se utiliza para envolver controladores (ver `GenericController.js`).
* **`throwError`**: para uso en servicios, recibe un mensaje y un estado. Ejemplo:

```javascript
import eh from "./Configs/errorHandlers.js";

eh.throwError("Usuario no encontrado", 404);
```

* **`middError`**: para uso en middlewares, devuelve un error para `next()`. Ejemplo:

```javascript
import eh from "./Configs/errorHandlers.js";

if (!user) {
  return next(eh.middError("Falta el usuario", 400));
}
```
