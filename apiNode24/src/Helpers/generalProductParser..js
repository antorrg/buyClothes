
export const product1Parser = (product)=>{
    return {
        id: product.id,
        order: product.order,
        characteristics: product.characteristics,
        images: product.images.map(img => img),
        price: product.price,
        stock: product.stock,
        size: product.size,
        extras: product.Extras.map(name=>name.name).join(','),
        enable: product.enable,
    }
};
export const generalProductParser = (genProduct) => {
    return {
      id: genProduct.id,
      name: genProduct.name,
      description: genProduct.description,
      released: genProduct.released,
       Categories: genProduct.Categories.map(category => category.name)[0],
       Disciplines: genProduct.Disciplines.map(disc => disc.name)[0],
       Genres: genProduct.Genres.map(genre => genre.name)[0],
       Trademarcks: genProduct.Trademarcks.map(trade => trade.name)[0],
      enable: genProduct.enable,
      createdAt: genProduct.createdAt,
      updatedAt: genProduct.updatedAt,
  
      Product1s: genProduct.Product1s.map(product => ({
        id: product.id,
        order: product.order,
        characteristics: product.characteristics,
        images: product.images.map(img => img),
        price: product.price,
        stock: product.stock,
        size: product.size,
        extras: product.Extras.map(name=>name.name)[0],
        enable: product.enable,
      })),
    };
    
  };