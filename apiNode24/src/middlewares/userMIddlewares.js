import env from "../envConfig.js"
import eh from "../utils/errors/errorHandlers.js"
import {optionBoolean, revertScope} from '../Helpers/userHelper.js'


export default {
    createUser : async (req, res, next)=>{
        if (req.method !== 'POST'){return next(eh.middError(`Method ${req.method} Not Allowed`,405))}
        let{email, password, picture, role}= req.body;
        const defaultPicture = env.UserImage;
        const defaultRole = 1;
        // Validar si existe el email y su formato usando una expresión regular
        if(!email){return next(eh.middError('Missing email',400))}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {return next(eh.middError('Invalid email format',400))}
        //Password 
        if(!password){return next(eh.middError('Missing User ID',400))}
        
        if(!picture){req.body.picture = defaultPicture}
        if(role){req.body.role = defaultRole}
        if(!role){req.body.role = defaultRole}
        
        next()
},
loginUser : async (req, res, next)=>{
        const{email, password}= req.body;
        // Validar si existe el email y su formato usando una expresión regular
        if(!email){return next(eh.middError("Falta el email", 400))};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {return next(eh.middError("Formato de email invalido", 400))}
        if(!password){return next(eh.middError("Falta la contraseña!", 400))};
        const passwordRegex = /^(?=.*[A-Z]).{8,}$/; // Al menos 8 caracteres y una letra mayúscula
        if (!passwordRegex.test(password)) {return next(eh.middError("Contraseña invalida. Esta debe tener al menos 8 caracteres y una mayuscula",400))}
        next()
},

updUserMidd : (req, res, next) => {
    
    const newData = req.body;
  
    // Validar que el cuerpo de la solicitud esté presente y no vacío
    if (!newData || Object.keys(newData).length === 0) {return next(eh.middError("Faltan elementos!!", 400))}

    // Puedes agregar validaciones adicionales para los campos esperados en newData
    const requiredFields = ["email", "given_name", "picture", "country"];
    const missingFields = requiredFields.filter(field => !(field in newData));
    if (missingFields.length > 0) {return next(eh.middError(`Parametros faltantes: ${missingFields.join(", ")}`, 400))}
    next();
},

userVerifyPassMidd : (req, res, next) => {
    const { id , password}= req.body
    const {userId}=req.userInfo
   
    //Validar que el id y el userId (token) sean iguales.
    if(id !== userId){return next(eh.middError("Solo el propietario de la cuenta puede cambiar la contraseña!!",400))}
    if(!password){return next(eh.middError("Falta la contraseña!", 400))};
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/; // Al menos 8 caracteres y una letra mayúscula
    if (!passwordRegex.test(password)) {return next(eh.middError("Contraseña invalida. Esta debe tener al menos 8 caracteres y una mayuscula",400))}
    next();
},
userChangePassMidd : (req, res, next) => {
    const { id } = req.params; 
    const {password}= req.body;
    const {userId}=req.userInfo;
    //Validar que el id y el userId (token) sean iguales.
    if(id !== userId){return next(eh.middError("Solo el propietario de la cuenta puede cambiar la contraseña!!",400))}
    if(!password){return next(eh.middError("Falta la contraseña!", 400))};
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/; // Al menos 8 caracteres y una letra mayúscula
    if (!passwordRegex.test(password)) {return next(eh.middError("Contraseña invalida. Esta debe tener al menos 8 caracteres y una mayuscula",400))}
    next();
},

upgradeUserMidd : (req, res, next) => {
    let newData = req.body;
    const {userRole} = req.userInfo;
   
    // Validar que el cuerpo de la solicitud esté presente y no vacío
    if (!newData || Object.keys(newData).length === 0) {return next(eh.middError("Faltan elementos!!"))}

    // Puedes agregar validaciones adicionales para los campos esperados en newData
    const requiredFields = ["role", "enable"];
    const missingFields = requiredFields.filter(field => !(field in newData));
    if (missingFields.length > 0) {return next(eh.middError(`Parametros faltantes: ${missingFields.join(", ")}`, 400))}
    let parsedData = {
        enable : optionBoolean(newData.enable),
        role,
        userRole,
    }
    req.body= parsedData
    next();
},


}