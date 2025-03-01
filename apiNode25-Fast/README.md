Con Fastify y PostgreSQL, puedes usar **Prisma** o **Knex.js** como alternativa a Sequelize. Aquí te explico ambas opciones:

---

## 🔹 Opción 1: Prisma (Recomendada 🚀)
Prisma es más moderno y fácil de usar en comparación con Sequelize.

### 1️⃣ Instalar dependencias:
```sh
npm install @prisma/client
npm install --save-dev prisma
```

### 2️⃣ Inicializar Prisma:
```sh
npx prisma init
```
Esto generará una carpeta `prisma/` con un archivo `schema.prisma`.

### 3️⃣ Configurar `schema.prisma`
Edita el archivo `prisma/schema.prisma` y ajusta la configuración de PostgreSQL:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
```

### 4️⃣ Crear y aplicar la migración:
```sh
npx prisma migrate dev --name init
```

### 5️⃣ Usar Prisma en Fastify:
```js
import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const fastify = Fastify();
const prisma = new PrismaClient();

fastify.get('/users', async (request, reply) => {
  const users = await prisma.user.findMany();
  return users;
});

fastify.listen({ port: 3000 }, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

## 🔹 Opción 2: Knex.js (Parecido a Sequelize)
Si prefieres algo más similar a Sequelize, Knex.js es una buena opción.

### 1️⃣ Instalar dependencias:
```sh
npm install knex pg
```

### 2️⃣ Configurar Knex:
```sh
import Knex from 'knex';

const knex = Knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'tu_password',
    database: 'tu_base_de_datos',
  },
});

export default knex;
```

### 3️⃣ Usar Knex en Fastify:
```js
import Fastify from 'fastify';
import knex from './db.js'; // Archivo donde configuras Knex

const fastify = Fastify();

fastify.get('/users', async (request, reply) => {
  const users = await knex('users').select('*');
  return users;
});

fastify.listen({ port: 3000 }, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

## 📌 ¿Cuál elegir?
- **Si quieres algo moderno, tipado y fácil de usar → Prisma.**
- **Si prefieres algo más flexible y parecido a Sequelize → Knex.js.**  

Prisma es más rápido para la mayoría de los casos, pero si ya usaste SQL puro con Sequelize, Knex te resultará más familiar.

¿Con cuál te gustaría probar? 🚀