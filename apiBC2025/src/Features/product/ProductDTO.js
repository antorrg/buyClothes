
export class ProductDTO {
  static parser = (d, combined = false) => {
    const product = {
      id: d.id,
      name: d.name,
      description: d.description,
      code: d.code,
      picture: d.picture,
      released: d.released,
      Category: d.Categories ? d.Categories.map(cat => cat.name).join() : 'Null',
      Discipline: d.Disciplines ? d.Disciplines.map(disc => disc.name).join() : 'Null',
      Genre: d.Genres ? d.Genres.map(gen => gen.name).join() : 'Null',
      Trademark: d.Trademarks ? d.Trademarks.map(trade => trade.name).join() : 'Null',
      enabled: d.enabled,
    };

    if (combined === true && d.ProductVariants) {
      product.variants = d.ProductVariants.map(v => ({
        id: v.id,
        ProductId: v.ProductId,
        order: v.order,
        characteristics: v.characteristics,
        images: v.images,
        size: v.size,
        color: v.color,
        price: v.price,
        stock: v.stock,
        enabled: v.enabled
      }));
    }

    return product;
  };
}
