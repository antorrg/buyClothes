let adminToken = ''
let userToken = ''
let storeId = ''
let numberId

export const setAdminToken = (newToken) => {
  adminToken = newToken
}

export const getAdminToken = () => {
  return adminToken
}

export const setUserToken = (newToken) => {
  userToken = newToken
}

export const getUserToken = () => {
  return userToken
}

export const setStringId = (newId) => {
  storeId = newId
}

export const getStringId = () => {
  return storeId
}

export const setNumberId = (newId) => {
  numberId = newId
}

export const getNumberId = () => {
  return numberId
}
