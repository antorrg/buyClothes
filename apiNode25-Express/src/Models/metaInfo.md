Voy a explicarte cada uno de los campos que añadí y cómo puedes trabajar con datos JSON en PostgreSQL.

---

### 🔹 **Campos añadidos en la tabla `Trademarck`**
Estos campos están orientados a mejorar el SEO y la promoción de productos:

1. **`meta_title` (STRING)**
   - Se usa como el título de la página en los motores de búsqueda (etiqueta `<title>` en HTML).
   - Debe ser llamativo y contener palabras clave relevantes.
   - Ejemplo: `"Nike - Zapatillas deportivas para running | Tienda Online"`

2. **`meta_description` (STRING)**
   - Es una breve descripción que aparece en los resultados de búsqueda debajo del título.
   - Debe describir bien la marca en unas 150-160 palabras.
   - Ejemplo: `"Descubre la colección de zapatillas de running Nike. Comodidad, estilo y tecnología avanzada para mejorar tu rendimiento."`

3. **`meta_keywords` (ARRAY de STRING)**
   - Lista de palabras clave relevantes para SEO.
   - Ejemplo: `["Nike", "zapatillas deportivas", "running", "moda deportiva"]`

4. **`meta_tags` (JSONB)**
   - Permite almacenar información estructurada como etiquetas personalizadas.
   - Ejemplo:
     ```json
     {
       "og:title": "Nike - Zapatillas deportivas para running",
       "og:description": "Compra las mejores zapatillas deportivas de Nike.",
       "og:image": "https://example.com/nike-logo.jpg"
     }
     ```
   - Esto se usa para las "Open Graph Tags", que ayudan a mejorar la vista previa en redes sociales.

5. **`logo` (STRING)**
   - URL de la imagen del logotipo de la marca.
   - Ejemplo: `"https://example.com/logos/nike.png"`

---

### 🔹 **Trabajar con JSON en PostgreSQL**
En PostgreSQL, los tipos de datos `JSON` y `JSONB` permiten almacenar datos en formato JSON.

1. **Diferencias entre `JSON` y `JSONB`**:
   - `JSON` almacena los datos en formato de texto sin procesar.
   - `JSONB` almacena los datos en binario, lo que permite búsquedas y filtrados más rápidos.
   - Para consultas eficientes, se recomienda usar `JSONB`.

2. **Ejemplo de inserción de datos JSONB**:
   ```sql
   INSERT INTO "Trademarck" (id, name, meta_tags)
   VALUES (
       'uuid-v4-id',
       'Nike',
       '{
         "og:title": "Nike - Zapatillas deportivas para running",
         "og:description": "Compra las mejores zapatillas deportivas de Nike.",
         "og:image": "https://example.com/nike-logo.jpg"
       }'::jsonb
   );
   ```

3. **Consultas JSONB**:
   - Obtener una clave específica dentro del JSONB:
     ```sql
     SELECT meta_tags->>'og:title' FROM "Trademarck" WHERE name = 'Nike';
     ```
   - Filtrar por un valor dentro del JSONB:
     ```sql
     SELECT * FROM "Trademarck" WHERE meta_tags->>'og:title' = 'Nike - Zapatillas deportivas para running';
     ```

4. **Actualizar un campo JSONB**:
   ```sql
   UPDATE "Trademarck"
   SET meta_tags = jsonb_set(meta_tags, '{og:description}', '"Nueva descripción optimizada para SEO"')
   WHERE name = 'Nike';
   ```

---

### 📌 **Resumen**
- Los nuevos campos ayudan a mejorar el SEO y la promoción de productos en redes sociales.
- `JSONB` permite almacenar y consultar datos estructurados en PostgreSQL.
- Puedes usar consultas SQL para filtrar, actualizar y extraer datos específicos de `JSONB`.

Si necesitas más detalles o un caso práctico en Express.js, dime y te lo explico. 🚀