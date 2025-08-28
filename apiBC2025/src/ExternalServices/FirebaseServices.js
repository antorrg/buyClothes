import admin, { bucket } from './firebase.js'
import eh from '../Configs/errorHandlers.js'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export default class FirebaseServices {
  static verifyAuth = (requiredRoles = null) => {
    if (requiredRoles && !Array.isArray(requiredRoles)) { // Asegurarse que requiredRoles sea un array (o null)
      requiredRoles = [requiredRoles]
    }
    return async (req, res, next) => {
      const token = req.headers.authorization?.split(' ')[1]

      if (!token) {
        return next(eh.middError('Token requerido', 401))
      }
      try {
        const decodedToken = await admin.auth().verifyIdToken(token)

        req.uid = decodedToken.uid
        req.userRole = decodedToken.role || null

        // Validar rol si se requiere
        if (requiredRoles && !requiredRoles.includes(decodedToken.role)) {
          return next(eh.middError('No tienes permisos para acceder a este recurso', 403))
        }
        return next()
      } catch (error) {
        return next(eh.middError('Token inválido', 401))
      }
    }
  }

  static setUserRole = async (uid, role) => {
    try {
      await admin.auth().setCustomUserClaims(uid, { role })
      console.log(`Rol "${role}" asignado al usuario ${uid}`)
      return { success: true }
    } catch (error) {
      eh.processError(error, 'Firebase error')
    }
  }

  static uploadImage = async (fileToUpload) => {
    try {
      const { buffer: fileBuffer, originalname: originalName, mimetype: mimeType } = fileToUpload
      // Genera un nombre único para el archivo
      const fileName = `buyClothesImages/${uuidv4()}${path.extname(originalName)}`
      const file = bucket.file(fileName)

      // Metadatos para el archivo
      const metadata = {
        metadata: {
          firebaseStorageDownloadTokens: uuidv4() // Token para URL pública
        },
        contentType: mimeType,
        cacheControl: 'public, max-age=31536000'
      }

      // Subir el buffer
      await file.save(fileBuffer, {
        metadata,
        public: false, // privado, pero con token de acceso
        validation: 'md5'
      })

      // Construir URL de descarga con token
      // const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media&token=${metadata.metadata.firebaseStorageDownloadTokens}`;
      const encodedName = encodeURIComponent(fileName)
      const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodedName}?alt=media&token=${metadata.metadata.firebaseStorageDownloadTokens}`

      return { downloadURL, fileName }
    } catch (error) {
      eh.processError(error, 'Firebase uploader error')
    }
  }

  static deleteImageByUrl = async (fileUrl) => {
    try {
      const encodedFileName = fileUrl.split('/o/')[1].split('?')[0]
      const fileName = decodeURIComponent(encodedFileName)
      const nameSendered = fileName.split('/')[1]
      await FirebaseServices.#deleteImage(fileName)
      return `Image ${nameSendered} deleted successfully`
    } catch (error) {
      eh.processError(error, 'Firebase deleteImage error')
    }
  }

  static #deleteImage = async (fileName) => {
    const file = bucket.file(fileName)
    await file.delete()
  }
}
