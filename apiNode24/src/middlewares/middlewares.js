import eh from '../utils/errors/errorHandlers.js'
import { validate as uuidValidate, version as uuidVersion } from 'uuid';


//return next(eh.throwError("Formato inválido", 400));

export default {
    genProdCreate : (req, res, next)=>{
        const data = req.body;
        const uniqueField= 'name' //campo de busqueda para el where
        if (!data || Object.keys(data).length === 0) {return next(eh.throwError('Faltan elementos!!', 400))}
        // Validar los campos requeridos en newData
        const requiredFields = ['name', 'description', 'released', 'category','discipline','genre','trademarck' ];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
             return next(eh.throwError(`Parametros faltantes: ${missingFields.join(', ')}`, 400));
        }
        // Validar los items
        let variants = data.variants;
        if (!variants || variants.length === 0) {
          return next(eh.throwError('Missing variants!!', 400));
        }
    
        const variantsFields = ['characteristics', 'price', 'stock', 'images', 'size', 'extra'];
    
        // Iterar los items y lanzar el error en cuanto se detecta un campo faltante
        for (let i = 0; i < variants.length; i++) {
            const variant = variants[i];
            const missingvariantFields = variantsFields.filter(field => !(field in variant));
    
            if (missingvariantFields.length > 0) { return next(eh.throwError(`Missing parameters in variants ${i + 1}: ${missingItemFields.join(', ')}`, 400));
            }
        }
        req.body.uniqueField = uniqueField;
        next();
    },
    createProduct1 : (req, res, next) => {
        const newData = req.body;
        const uniqueField= 'order' //campo de busqueda para el where
        if (!newData || Object.keys(newData).length === 0) {return next(eh.throwError('Faltan elementos!!', 400))}
    
        const requiredFields = ['order', 'characteristics', 'price', 'stock', 'images', 'size', 'extra'];
        const missingFields = requiredFields.filter(field => !(field in newData));
        if (missingFields.length > 0) {return next(eh.throwError(`Parametros faltantes: ${missingFields.join(', ')}`, 400))}
        req.body.uniqueField = uniqueField;
        next();
        },
    genProdGetAll : (req, res, next)=>{
        const page = parseInt(req.query.page, 10);
        const size = parseInt(req.query.size, 10)
        req.query.page = isNaN(page) || page < 1 ? 1 : page;
        req.query.size = isNaN(size) || size < 1 ? 3 : size;
        next();
    },
    updateGenProd : (req, res, next) => {
        const {id} = req.params; const newData = req.body;

        if (!id) {return next(eh.throwError('Missing id',400))}
        if (!uuidValidate(id)) {return next(eh.throwError('Invalid parameters', 400))}

        if (!newData || Object.keys(newData).length === 0) {eh.throwError('Faltan elementos!!', 400)}
    
        const requiredFields = ['name', 'description', 'released', 'category','discipline','genre','trademarck'];
        const missingFields = requiredFields.filter(field => !(field in newData));
        if (missingFields.length > 0) {eh.throwError(`Parametros faltantes: ${missingFields.join(', ')}`, 400)}
        next();
    },
    updateProduct1 : (req, res, next) => {
        const {id} = req.params; const newData = req.body;
    
        if (!id) {return next(eh.throwError('Missing id',400))}
        if (!uuidValidate(id)) {return next(eh.throwError('Invalid parameters', 400))}

        if (!newData || Object.keys(newData).length === 0) {eh.throwError('Faltan elementos!!', 400)}
        
         const requiredFields = ['order', 'characteristics', 'price', 'stock', 'images', 'size', 'extra'];
        const missingFields = requiredFields.filter(field => !(field in newData));
        if (missingFields.length > 0) {eh.throwError(`Parametros faltantes: ${missingFields.join(', ')}`, 400)}
        next();
    },
    genericCreate: (req, res, next)=>{
        const newData = req.body;
        const uniqueField= 'name' //campo de busqueda para el where
        if (!newData || Object.keys(newData).length === 0) {return next(eh.throwError('Faltan elementos!!', 400))}
    
        const requiredFields = ['name'];
        const missingFields = requiredFields.filter(field => !(field in newData));
        if (missingFields.length > 0) {return next(eh.throwError(`Parametros faltantes: ${missingFields.join(', ')}`, 400))}
        req.body.uniqueField = uniqueField;
        next();
    },
    genericUpdate: (req, res, next)=>{
        const {id} = req.params;
        const newData = req.body;
        const idIsNumber = !isNaN(id) && Number.isInteger(parseFloat(id));
        if (!id) {return next(eh.throwError('Missing id',400))}
        if (id && !idIsNumber) {return next(eh.throwError('Invalid parameters', 400))}

        if (!newData || Object.keys(newData).length === 0) {return next(eh.throwError('Faltan elementos!!', 400))}
    
        const requiredFields = ['name','enable'];
        const missingFields = requiredFields.filter(field => !(field in newData));
        if (missingFields.length > 0) {return next(eh.throwError(`Parametros faltantes: ${missingFields.join(', ')}`, 400))}
        next();
    },
    middUuid: (req, res, next) => {
        const { id } = req.params;
         if (!id) {return next(eh.throwError('Missing id',400))}
         if (!uuidValidate(id)) {return next(eh.throwError('Invalid parameters', 400))}
           next();
   },
            
    middIntId : (req, res, next) => {
            const {id} = req.params;
            const idIsNumber = !isNaN(id) && Number.isInteger(parseFloat(id));
            if (!id) {return next(eh.throwError('Missing id',400))}
           if (id && !idIsNumber) {return next(eh.throwError('Invalid parameters', 400))}
            next()
    },
//*%%%%%%%%%  Usuarios: %%%%%%%%%%%%%%%%%%%%%%%%%%
createUser : async (req, res, next)=>{
    const{email}= req.body;
    // Validar si existe el email y su formato usando una expresión regular
    if(!email){return next(eh.throwError('Missing email',400))}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {return next(eh.throwError('Invalid email format',400))}
    next()
},
loginUser : async (req, res, next)=>{
    const{email, password}= req.body;
    // Validar si existe el email y su formato usando una expresión regular
    if(!email){return next(eh.throwError('Missing email',400))}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {return next(eh.throwError('Invalid email format',400))}
    if(!password){return next(eh.throwError('Missing User ID',400))}
    //const passwordRegex = /^(?=.*[A-Z]).{8,}$/; // Al menos 8 caracteres y una letra mayúscula
    //if (!passwordRegex.test(password)) {eh.throwError('Contraseña invalida. Esta debe tener al menos 8 caracteres y una mayuscula',400)}
    next()
},

updUserMidd : (req, res, next) => {

const { id } = req.params; const newData = req.body;
// Validar que el ID esté presente
if (!id) {return next(eh.throwError('Missing id',400))}
// Validar que el ID sea un UUID v4 válido
if (!uuidValidate(id) || uuidVersion(id) !== 4) {return next(eh.throwError('Invalid id format',400))}
// Validar que el cuerpo de la solicitud esté presente y no vacío
if (!newData || Object.keys(newData).length === 0) {return next(eh.throwError('Missing parameters',400))}

// Puedes agregar validaciones adicionales para los campos esperados en newData
const requiredFields = ['email', 'given_name', 'picture', 'country',];
const missingFields = requiredFields.filter(field => !(field in newData));
if (missingFields.length > 0) {return next(eh.throwError(`Missing parameters: ${missingFields.join(', ')}`, 400))}
next();
},
 } 
 