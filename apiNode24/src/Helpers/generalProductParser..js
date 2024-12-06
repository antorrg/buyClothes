import { filterData } from "./universalHelpers.js";

export const product1Parser = (product, isAdmin)=>{
  
        return { id: product.id,
        order: product.order,
        characteristics: product.characteristics,
        images: product.images.map(img => img),
        price: product.price,
        stock: product.stock,
        size: product.size,
        extras: product.Extras.map(name=>name.name).join(','),
        enable: isAdmin ? product.enable : (product.enable || null),
        // Si no es admin, solo muestra el producto si está habilitado
        ...(isAdmin || product.enable ? {} : null)
        }
    
};
export const generalProductParser = (genProduct, isAdmin) => {
  if (!isAdmin && !genProduct.enable) {
    return null;
}
    return {
      id: genProduct.id,
      name: genProduct.name,
      description: genProduct.description,
      released: genProduct.released,
       Categories: genProduct.Categories.map(category => category.name)[0],
       Disciplines: genProduct.Disciplines.map(disc => disc.name)[0],
       Genres: genProduct.Genres.map(genre => genre.name)[0],
       Trademarcks: genProduct.Trademarcks.map(trade => trade.name)[0],
      enable:  genProduct.enable,
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
        enable: isAdmin ? product.enable : (product.enable || null),
        // Si no es admin, solo muestra el producto si está habilitado
        ...(isAdmin || product.enable ? {} : null)
      })),
    };
    
  };