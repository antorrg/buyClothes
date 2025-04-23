/**
* @swagger
* tags:
*   - name: Products
*     description: Operaciones relacionadas con products
 */

/**
* @swagger
* '/api/product':
*   post:
*     summary: Crear un nuevo product
*     tags: [Products]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*                - name
*                - description
*                - images
*                - released
*                - enable
*                - attributes
*                - trademark
*                - variants
*             properties:
*             name:
*               type: string
*               example: name ejemplo
*               description: Descripción de name
*             description:
*               type: string
*               example: description ejemplo
*               description: Descripción de description
*             images:
*               type: string
*               example: images ejemplo
*               description: Descripción de images
*             released:
*               type: string
*               example: released ejemplo
*               description: Descripción de released
*             enable:
*               type: boolean
*               example: true
*               description: Descripción de enable
*             attributes:
*               type: string
*               example: attributes ejemplo
*               description: Descripción de attributes
*             trademark:
*               type: string
*               example: trademark ejemplo
*               description: Descripción de trademark
*             variants:
*               type: string
*               format: array
*               example: variants ejemplo
*               description: Descripción de variants
*     responses:
*       201:
*         description: Creación exitosa
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 message:
*                   type: string
*                 results:
*                   $ref: '#/components/schemas/Product'
 */

/**
* @swagger
* '/api/product':
*   get:
*     summary: Obtener todos los products
*     tags: [Products]
*     parameters:
*       - in: query
*         name: page
*         required: false
*         schema:
*           type: integer
*         description: Numero de pagina
*       - in: query
*         name: size
*         required: false
*         schema:
*           type: integer
*         description: Cantidad de elementos por pagina
*       - in: query
*         name: name
*         required: false
*         schema:
*           type: string
*         description: Busqueda del producto por nombre
*       - in: query
*         name: trademark
*         required: false
*         schema:
*           type: string
*         description: Busqueda del producto por marca
*       - in: query
*         name: fields
*         required: false
*         schema:
*           type: string
*         description: Otros campos de seleccion
*     responses:
*       200:
*         description: Lista de products
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Product'
 */

/**
* @swagger
* '/api/product/{id}':
*   get:
*     summary: Obtener un product por ID
*     tags: [Products]
*     parameters:
*       - in: path
*         name: id
*         required: false
*         schema:
*           type: string
*         description: Id del producto
*     responses:
*       200:
*         description: product encontrado
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*       404:
*         description: product no encontrado
 */

/**
* @swagger
* '/api/product/{id}':
*   put:
*     summary: Actualizar un product
*     tags: [Products]
*     parameters:
*       - in: path
*         name: id
*         required: false
*         schema:
*           type: string
*         description: Id del producto
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*             name:
*               type: string
*               example: name ejemplo
*               description: Descripción de name
*             description:
*               type: string
*               example: description ejemplo
*               description: Descripción de description
*             images:
*               type: string
*               example: images ejemplo
*               description: Descripción de images
*             released:
*               type: string
*               example: released ejemplo
*               description: Descripción de released
*             enable:
*               type: boolean
*               example: true
*               description: Descripción de enable
*             attributes:
*               type: string
*               example: attributes ejemplo
*               description: Descripción de attributes
*             trademark:
*               type: string
*               example: trademark ejemplo
*               description: Descripción de trademark
*             variants:
*               type: string
*               format: array
*               example: variants ejemplo
*               description: Descripción de variants
*     responses:
*       200:
*         description: Actualización exitosa
*       400:
*         description: Error de validación
 */

/**
* @swagger
* '/api/product/{id}':
*   delete:
*     summary: Eliminar un product
*     tags: [Products]
*     parameters:
*       - in: path
*         name: id
*         required: false
*         schema:
*           type: string
*         description: Id del producto
*     responses:
*       200:
*         description: Eliminado correctamente
*       404:
*         description: product no encontrado
 */