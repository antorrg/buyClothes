export class VariantDTO {
  static parser (d) {
    return {
      id: d.id,
      order: d.order,
      characteristics: d.characteristics,
      images: d.images,
      size: d.size,
      color: d.color,
      price: d.price,
      stock: d.stock,
      enabled: d.enabled
    }
  }
}
export const emptyObject = {
  id: 'none',
  order: 'no data yet',
  characteristics: 'no data yet',
  images: 'no data yet',
  size: 'no data yet',
  color: 'no data yet',
  price: 'no data yet',
  stock: 'no data yet',
  enabled: 'no data yet'
}
