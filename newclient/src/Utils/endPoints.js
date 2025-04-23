// Info 
//todo endpointXX = new BaseEndpoint(urlBase, admin = false)( cuando no es admin no añade el token de autorización)
// get(endpoint, params = {}, auxFunction = null, admin = false) 
//post(endpoint, data = {}, auxFunction = null, admin = false, rejectfunction, message)
//put(endpoint, data = {}, auxFunction = null, admin = false, rejectfunction, message)
//delete(endpoint, auxFunction = null, admin = false, rejectfunction, message)

//(endpoint, data = {}, auxFunction = null, admin = false, rejectFunction = null, message= 'Operación exitosa'
/*
const userLogin = new BaseEndpoint('/api/v1/user', false)

export const loginUser = (data, aux, auxReject)=> userLogin.post('login', data, aux, false, auxReject, '¡Verificación exitosa. Bienvenido!')

export const userValid = new BaseEndpoint('/api/v1/user', true) //* Para las tareas de edición usar esta instancia.

//todo  Endpoints Landing:

const landingAdmin = new BaseEndpoint('/api/v1/land', true)

export const landingCreate = (data, aux, auxReject)=> landingAdmin.post('create', data, aux, true, auxReject, 'Portada creada exitosamente')

export const sendEmails = (data, aux, auxReject)=> landingAdmin.post('emails', data, aux, true, auxReject, 'Email enviado exitosamente')

export const landingGet = ()=> landingAdmin.get('', null, null, true)

export const landingGetById = (id)=> landingAdmin.get(`${id}`, null, null, true )

export const landingUpdate = (id, data, aux, auxReject)=> landingAdmin.put(`${id}`, data, aux, true, auxReject, 'Portada actualizada exitosamente')

export const landingDelete = (id, aux, auxReject)=> landingAdmin.delete(`/${id}`,aux, true, auxReject)

*/