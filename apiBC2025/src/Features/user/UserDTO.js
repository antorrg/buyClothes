export class UserDTO {
  static parser (d) {
    return {
      id: d.id,
      email: d.email,
      role: scope(d.role),
      picture: d.picture,
      name: d.name,
      enabled: d.enabled
    }
  }

  static receipeData (d) {
    return {
      id: d.id || 'unknown',
      userId: d.userId || null,
      surname: d.surname || 'no data yet',
      typeId: d.typeId || 'no data yet',
      numberId: d.numberId || 'no data yet',
      country: d.country || 'no data yet',
      postalCode: d.postalCode || 'no data yet',
      address: d.address || 'no data yet',
      additionalInfo: d.additionalInfo || 'no data yet'

    }
  }
}
export const dataEmpty = {
  id: 'none',
  email: 'no data yet',
  name: 'no data yet',
  role: 'no data yet',
  picture: 'no data yet',
  enabled: true,
  createdAt: 'no data yet'
}

function scope (role) {
  switch (role) {
    case 1:
      return 'User'
    case 2:
      return 'Moderator'
    case 3:
      return 'Admin'
    case 9:
      return 'SuperAdmin'
    default:
      return 'User'
  }
}
