//Cuando estoy formateando un solo elemento (por id) debo colocar como segundo parametro "true",
//de lo contrario "false";
const formatProductData = (genProducts, isSingle) => {
  return isSingle
    ? formatSingleProduct(genProducts)
    : genProducts.map(genProduct => formatSingleProduct(genProduct));
};

const formatSingleProduct = (genProduct) => {
  const formattedProduct = {
    id: genProduct.id,
    name: genProduct.name,
    description: genProduct.description,
    released: genProduct.released,
     Categories: genProduct.Categories.map(category => category.name),
     Disciplines: genProduct.Disciplines.map(disc => disc.name),
     Genres: genProduct.Genres.map(genre => genre.name),
     Trademarcks: genProduct.Trademarcks.map(trade => trade.name),
    enable: genProduct.enable,
    createdAt: genProduct.createdAt,
    updatedAt: genProduct.updatedAt,

    Product1s: genProduct.Product1s.map(product => ({
      id: product.id,
      characteristics: product.characteristics,
      images: product.images.map(img => img),
      price: product.price,
      stock: product.stock,
      size: product.size,
      extras: product.Extras.map(name=>name.name),
      enable: product.enable,
    })) ||[],
  };

  return formattedProduct;
};

export default formatProductData;
