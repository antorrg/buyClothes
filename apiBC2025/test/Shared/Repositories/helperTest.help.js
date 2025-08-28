export const createData = {
  email: 'usuario@gmail.com',
  password: 'L1234567',
  picture: 'https://picture.com'
}
export const responseData = {
  id: expect.any(String),
  email: 'usuario@gmail.com',
  role: 'User',
  picture: 'https://picture.com',
  username: null,
  enabled: true,
  createdAt: expect.any(Date)
}
export const dataEmpty = {
  id: 'none',
  email: 'no data yet',
  username: 'no data yet',
  password: 'no data yet',
  role: 'no data yet',
  picture: 'no data yet',
  enabled: true,
  createdAt: 'no data yet'
}

export const responseUpdData = {
  id: expect.any(String),
  email: 'perico@gmail.com',
  role: 'User',
  picture: 'https://picture.com',
  username: 'Perico de los palotes',
  enabled: false,
  createdAt: expect.any(Date)
}
export function cleanData (d) {
  return {
    id: d.id,
    email: d.email,
    role: scope(d.role),
    picture: d.picture,
    username: d.username,
    enabled: d.enabled,
    createdAt: d.createdAt
  }
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
