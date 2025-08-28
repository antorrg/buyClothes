export class CatDTO {
  static parser (d) {
    return {
      id: d.id,
      name: d.name,
      enabled: d.enabled
    }
  }
}
export const emptyObject = {
  id: 0,
  name: 'no data yet',
  enabled: false
}
