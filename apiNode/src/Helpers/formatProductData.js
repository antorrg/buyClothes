//Cuando estoy formateando un solo elemento (por id) debo colocar como segundo parametro "true",
//de lo contrario "false";
const formatProductData = (products, isSingle) => {
  return isSingle
    ? formatSingleProduct(products)
    : products.map(product => formatSingleProduct(product));
};

const formatSingleProduct = (product) => {
  const formattedProduct = {
    id: product.id,
    name: product.name,
    productCode: product.productCode,
    description: product.description,
    characteristics: product.characteristics,
    released: product.released,
    price: product.price,
    stock: product.stock,
    enable: product.enable,
    deletedAt: product.deletedAt,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    Images: product.Images.map(image => image.images.map(url => url)).flat(),
    Categories: product.Categories.map(category => category.name),
     Sizes: product.Sizes.map(size => size.name),
  };

  return formattedProduct;
};

export default formatProductData;
