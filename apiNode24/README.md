[![npm version](https://badgen.net/npm/v/sequelize)](https://www.npmjs.com/package/sequelize)
[![Build Status](https://github.com/sequelize/sequelize/workflows/CI/badge.svg)](https://github.com/sequelize/sequelize/actions?query=workflow%3ACI)
[![npm downloads](https://badgen.net/npm/dm/sequelize)](https://www.npmjs.com/package/sequelize)
# apiNode:
## Api REST creada para "buyClothes:
Estas son las rutas y sus respectivas caracteristicas:
## Usuarios

### Creación de Usuario

- Método: `POST`
- Ruta: `/user/create`
- Descripción: Crea un nuevo usuario.
- Parámetros:
  - `email` (string): Correo electrónico del usuario.
  - `password` (string): Contraseña del usuario.

### Inicio de Sesión de Usuario

- Método: `POST`
- Ruta: `/user/login`
- Descripción: Inicia sesión para obtener un token de acceso.
- Parámetros:
  - `email` (string): Correo electrónico del usuario.
  - `password` (string): Contraseña del usuario.

### Obtener Todos los Usuarios (necesita permiso de moderator o admin)

- Método: `GET`
- Ruta: `/user`
- Descripción: Obtiene la lista de todos los usuarios.

### Editar usuarios:(Necesita validacion y permiso de moderator o admin)

- Método: `PUT`
 - Ruta: `/user/:id`
- Descripción: Edita cualquier usuario, cambia sus permisos y puede bloquearlo y desbloquearlo.
- Parámetros: 
  - Imagen
  - Nombre
  - Apellido
  - Country
  - Role (selecciona)
  - Enable (selecciona)

> Nota: Cada usuario en particular puede editar su propio perfil desde la sección "configuración".


## Product1 
### Creación de un Producto
- Método: `POST`
- Ruta: `/`
- Descripción: Crea un nuevo producto a través de los datos ingresados. Necesita validación y permisos de "admin" o "moderator".
- Parámetros:
  - Nombre:
  - Descripción:
  - Características:
  - Lanzado a la venta:
  - Precio:
 

- Método:
  - Ruta
### Base de datos: 
#### Tabla Product1:
Campo|Tipo de dato
--|--
 id: | Integer (auto-incremental)
name:| String
productCode:| string (automatico)
description:| String 
characteristics:| Text 
released:| DateOnly
price:| Decimal(7, 2)
stock:| Integer
enable:| boolean (aut)
deleteAt:| boolean (aut)

#### Tabla Category:
Campo|Tipo de dato
--|--
id: | Integer
name: |String

#### Tabla image:
Campo|Tipo de dato
--|--
id: |Integer,
name: |String
images: |Array (string)

#### Tabla Extra

Campo|Tipo de dato
--|--
id: |Integer (auto-incremental)
name: | Array (string)

#### Tabla Rating:

Campo|Tipo de dato
--|--
id: | Integer (auto-incremental)
comment:|Text
score:|Integer (0 al 5)

#### Tabla Size:
Campo|Tipo de dato
--|--
id: |Integer (auto-incemental)
name:|String

#### Tabla User:
Campo|Tipo de dato
--|--
id:|UUID
email:|String
password:|String
name:|String
surname:|String
picture:|String
Role: | SmallInteger
country: |String
enable: |Boolean
deleteAt:|Boolean
created:|Boolean


