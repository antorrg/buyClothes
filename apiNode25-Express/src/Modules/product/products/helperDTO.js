
class ProductCleaner {
    
  static parserVariant (info) {
    return info?.map(dt => ({
      id: dt.id,
      ProductId: dt.ProductId,
      characteristics: dt.characteristics,
      order: dt.order,
      size: dt.size,
      color: dt.color,
      images: dt.images,
      price: dt.price,
      stock: dt.stock,
      enable: dt.enable
  
    }))
  }
  static parserProduct (dat) {
    return {
      id: dat.id,
      name: dat.name,
      description: dat.description,
      images: dat.images,
      released: dat.released,
      category: dat.category || null,
      discipline: dat.discipline || null,
      genre: dat.genre || null,
      trademark: dat.trademark || null,
      enable: dat.enable,
      variants: this.parserVariant(dat.variants)
  
    }
  }
  
 static parsedProductGet (products) {
    return products?.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      released: product.released,
      enable: product.enable,
      // Mapeamos los atributos asociados
      attributes: product.Attributes?.map(attr => ({
  
        [attr.type]: attr.name
      })),
      // Mapeamos las marcas asociadas
      trademark: product.Trademarks
        ? {
            name: product.Trademarks[0].name,
            logo: product.Trademarks[0].logo
          }
        : null,
      // Mapeamos las variantes del producto
      variants: product.ProductVariants?.map(variant => ({
        id: variant.id,
        ProductId: variant.ProductId,
        characteristics: variant.characteristics,
        images: variant.images,
        order: variant.order
      }))
    }))
  }
  static parsedProductGetById (product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      released: product.released,
      enable: product.enable,
      // Mapeamos los atributos asociados
      attributes: product.Attributes?.map(attr => ({
        name: attr.name,
        type: attr.type
      })),
      // Mapeamos las marcas asociadas
      trademark: product.Trademarks
        ? {
            name: product.Trademarks[0].name,
            logo: product.Trademarks[0].logo,
            metaTitle: product.Trademarks[0].metaTitle,
            metaDescription: product.Trademarks[0].metaDescription,
            metaKeywords: product.Trademarks[0].metaKeywords,
            ogImage: product.Trademarks[0].ogImage,
            twitterCard: product.Trademarks[0].twitterCard,
            officialWebsite: product.Trademarks[0].officialWebsite,
            socialMedia: product.Trademarks[0].socialMedia,
            brandStory: product.Trademarks[0].brandStory
          }
        : null,
      // Mapeamos las variantes del producto
      variants: product.ProductVariants?.map(variant => ({
        id: variant.id,
        ProductId: variant.ProductId,
        characteristics: variant.characteristics,
        images: variant.images,
        color: variant.color,
        order: variant.order,
        price: variant.price,
        size: variant.size,
        stock: variant.stock
      }))
    }
  }
}
export default ProductCleaner
  