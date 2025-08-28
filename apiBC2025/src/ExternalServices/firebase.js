import admin from 'firebase-admin'
import { getStorage } from 'firebase-admin/storage'
import path from 'path'
import eh from '../Configs/errorHandlers.js'

// Ruta al archivo JSON de credenciales
const serviceAccount = path.resolve('firebase-admin-key.json')

// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'apifirexperimental.appspot.com'
  // databaseURL: "https://<tu-proyecto>.firebaseio.com", // Reemplaza con tu URL de Firebase
})

export const bucket = getStorage().bucket() // Referencia al bucket raíz

export default admin

// Luego puedes especificar rutas completas para archivos:
// const file = bucket.file('documentos/reporte.pdf');
