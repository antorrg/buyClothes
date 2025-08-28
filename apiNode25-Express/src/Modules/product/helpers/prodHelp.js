export default class ProdHelp {
  static parseProduct (product, isDetailed = false) {
    const base = {
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      released: product.released,
      enable: product.enable,

      attributes: product.Attributes?.map(attr =>
        isDetailed
          ? { name: attr.name, type: attr.type }
          : { [attr.type]: attr.name }
      ),

      trademark: product.Trademarks
        ? {
            name: product.Trademarks[0].name,
            logo: product.Trademarks[0].logo,
            ...(isDetailed && {
              metaTitle: product.Trademarks[0].metaTitle,
              metaDescription: product.Trademarks[0].metaDescription,
              metaKeywords: product.Trademarks[0].metaKeywords,
              ogImage: product.Trademarks[0].ogImage,
              twitterCard: product.Trademarks[0].twitterCard,
              officialWebsite: product.Trademarks[0].officialWebsite,
              socialMedia: product.Trademarks[0].socialMedia,
              brandStory: product.Trademarks[0].brandStory
            })
          }
        : null,

      variants: product.ProductVariants?.map(variant => ({
        id: variant.id,
        ProductId: variant.ProductId,
        characteristics: variant.characteristics,
        images: variant.images,
        order: variant.order,
        ...(isDetailed && {
          color: variant.color,
          price: variant.price,
          size: variant.size,
          stock: variant.stock
        })
      }))
    }

    return base
  }

  static tradeInfo (dat) {
    return {
      name: dat.name,
      metaTitle: dat.metaTitle,
      metaDescription: dat.metaDescription,
      metaKeywords: dat.metaKeywords,
      ogImage: dat.ogImage,
      twitterCard: dat.twitterCard,
      logo: dat.logo,
      officialWebsite: dat.officialWebsite,
      socialMedia: dat.socialMedia,
      brandStory: dat.brandStory

    }
  }
}
