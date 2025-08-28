export const dataEmpty = {
  id: '',
  userId: 'no data yet',
  surname: 'no data yet',
  typeId: 'no data yet',
  numberId: 'no data yet',
  country: 'no data yet',
  postalCode: 'no data yet',
  address: 'no data yet',
  additionalInfo: 'Para realizar compras debe completar su informacion personal'

}

export class CustomerDTO {
  static parser (response) {
    let d
    if (typeof response !== 'object') {
      return dataEmpty
    } else d = response
    return {
      id: d.id || '',
      userId: d.userId || '',
      surname: d.surname || 'no data',
      typeId: d.typeId || 'no data',
      numberId: d.numberId || 'no data',
      country: d.country || 'no data',
      postalCode: d.postalCode || 'no data',
      address: d.address || 'no data',
      additionalInfo: d.additionalInfo || 'no data'
    }
  }
}
