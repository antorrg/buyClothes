import crypto from 'crypto'
import pkg from 'jsonwebtoken'
import env from '../envConfig.js'
import eh from '../utils/errors/errorHandlers.js'

//! Esta parte corresponde a jsonwebtoken:

// Estas funciones no se exportan porque intervienen en la confeccion de jsonwebtoken
const disguiseRole = (role, position) => {
  // Generar cadena aleatoria de 20 caracteres
  const generateSecret = () => {
    return crypto.randomBytes(10).toString('hex')
  }

  const str = generateSecret()
  if (position < 0 || position >= str.length) {
    throw new Error('Posición fuera de los límites de la cadena')
  }
  // Convertir el número a string
  const replacementStr = role.toString()
  // Crear la nueva cadena con el reemplazo
  return str.slice(0, position) + replacementStr + str.slice(position + 1)
}

const recoveryRole = (str, position) => {
  if (position < 0 || position >= str.length) {
    throw new Error('Posición fuera de los límites de la cadena')
  }
  // Recuperar el carácter en la posición especificada
  const recover = str.charAt(position)
  return parseInt(recover)
}

// En recoveryRole str es el dato entrante (string)
const generateToken = (user) => {
  const intData = disguiseRole(user.role, 5)
  // console.log('estoy en el token: ', expiresIn)
  const token = pkg.sign({ userId: user.id, email: user.email, role: user.role }, env.SecretKey, { expiresIn: env.JwtExpiresIn })
  return token
}
const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization
  if (!token) { return next(eh.middError('Missing token', 401)) }
  if (token.startsWith('Bearer')) {
    // Eliminar el prefijo 'Bearer ' del token
    token = token.slice(7, token.length)
  }
  pkg.verify(token, env.SecretKey, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return next(eh.middError('Expired Token', 401))
      } return next(eh.middError('Invalid Token', 401))
    }
    req.user = decoded
    const userId = decoded.userId
    const userRole = recoveryRole(decoded.internalData, 5)
    req.userInfo = { userId, userRole }
    // console.log('userInfo: ', req.user.userId, )
    // console.log('soy role : ', req.user.role)
    next()
  })
}
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const { userRole } = req.userInfo
    // const userRole = req.user.role; // asumiendo que el rol está en req.user después de la autenticación

    if (allowedRoles.includes(userRole)) {
      // El usuario tiene el rol necesario, permitir el acceso
      req.query.isAdmin = true
      next()
    } else {
      // El usuario no tiene el rol necesario, rechazar la solicitud
      return next(eh.middError('Access denied', 403))
    }
  }
}

// Este es un modelo de como recibe el parámetro checkRole:
// todo   app.get('/ruta-protegida', checkRole(['admin']), (req, res) => {
export default {
  generateToken,
  verifyToken,
  checkRole
}
