
class InfoCleaners {
  static parsedProductGet(products) {
    return products?.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      released: product.released,
      enable: product.enable,
      // Mapeamos los atributos asociados
      attributes: product.Attributes?.map(attr => ({
       
        [attr.type] : attr.name
      })),
      // Mapeamos las marcas asociadas
      trademark: product.Trademarks?
        {
        name: product.Trademarks[0].name,
        logo: product.Trademarks[0].logo,
      }: null,
      // Mapeamos las variantes del producto
      variants: product.ProductVariants?.map(variant => ({
        id: variant.id,
        ProductId: variant.ProductId,
        characteristics: variant.characteristics,
        images: variant.images,
        order: variant.order,
      })),
    }))
  };
  static parsedProductGetById(product) {
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
        type: attr.type,
      })),
      // Mapeamos las marcas asociadas
      trademark: product.Trademarks?
      { 
        name: product.Trademarks[0].name,
        logo: product.Trademarks[0].logo, 
        metaTitle: product.Trademarks[0].metaTitle,
        metaDescription: product.Trademarks[0].metaDescription,
        metaKeywords: product.Trademarks[0].metaKeywords,
        ogImage: product.Trademarks[0].ogImage,
        twitterCard : product.Trademarks[0].twitterCard,
        officialWebsite : product.Trademarks[0].officialWebsite,
        socialMedia : product.Trademarks[0].socialMedia,
        brandStory : product.Trademarks[0].brandStory
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
      })),
    }
  };
  static tradeInfo (dat){
    return {
      name : dat.name,
      metaTitle: dat.metaTitle,
      metaDescription: dat.metaDescription,
      metaKeywords : dat.metaKeywords,
      ogImage : dat.ogImage,
      twitterCard : dat.twitterCard,
      logo: dat.logo,
      officialWebsite: dat.officialWebsite,
      socialMedia: dat.socialMedia,
      brandStory : dat.brandStory
  
    }
  }

}
export default InfoCleaners
