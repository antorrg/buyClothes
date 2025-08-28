export default {
  productCreate1: [{ name: 'name', type: 'string' }, { name: 'description', type: 'string' }, { name: 'images', type: 'array' }, { name: 'released', type: 'string' }, { name: 'category', type: 'int' }, { name: 'discipline', type: 'int' }, { name: 'trademark', type: 'int' }],

  variantCreate: [{ name: 'order', type: 'string' }, { name: 'characteristics', type: 'string' }, { name: 'price', type: 'float' }, { name: 'stock', type: 'int' }, { name: 'images', type: 'array' }, { name: 'size', type: 'string' }, { name: 'color', type: 'string' }],

  productUpd: [{ name: 'enable', type: 'boolean' }, { name: 'name', type: 'string' }, { name: 'description', type: 'string' }, { name: 'images', type: 'array' }, { name: 'released', type: 'string' }, { name: 'category', type: 'int' }, { name: 'discipline', type: 'int' }, { name: 'trademark', type: 'int' }],

  variantUpd: [{ name: 'enable', type: 'boolean' }, { name: 'order', type: 'string' }, { name: 'characteristics', type: 'string' }, { name: 'price', type: 'float' }, { name: 'stock', type: 'int' }, { name: 'images', type: 'array' }, { name: 'size', type: 'string' }, { name: 'color', type: 'string' }],
  // Se definen, validan y tipan las queries aqui
  prodGetAll: [{ name: 'page', type: 'int' }, { name: 'size', type: 'int' }, { name: 'name', type: 'string' }, { name: 'trademark', type: 'int' }, { name: 'fields', type: 'string' }], // page, size, name, trademark, fields

  prodGetById: [{ name: 'size', type: 'string' }, { name: 'color', type: 'string' }], // size, color

  setAdmin:(req, res, next)=>{
    const isAdmin = true
    req.admin = isAdmin
    next()
  }
}

/* name: "Producto uno",
    description: "Descripcion producto uno",
    images : [
                "http://images1",
                "http://images2",
                "http://images3",
                "http://images4"
    ],
    released: "2025-02-24",
    category: 5,
    discipline : 3,
    genre: 1,
    trademark : 1,
    variants : [

    order: 1,
            characteristics: "Características de la Variante 1",
            price: 19.99,
            stock: 100,
            images: [
                "http://images1",
                "http://images2",
                "http://images3",
                "http://images4"
            ],
            size:"38",
            color: "Blanco"
    */
