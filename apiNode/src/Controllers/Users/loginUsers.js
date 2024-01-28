import {User} from '../../database';
import bcrypt from 'bcrypt';
import generateToken from '../../utils/generate'
import parsedUser from '../../Helpers/parsedUser'
import dotenv from 'dotenv';
dotenv.config();
const {USER_IMAGE} = process.env;

const loginUser = async(email, password)=>{
    const userf = await User.findOne({
        where: {
          email: email,
          deleteAt: false,
          //enable: true,
        },
      });
    // console.log(email);
    // console.log(password);
    // console.log(user);
      try {
        if (userf && userf.enable === false){
          throw new Error("Usuario bloqueado");
        }
        if (userf) {
          const passwordMatch = await bcrypt.compare(password, userf.password);
          if (passwordMatch) {
            // Contraseña válida, puedes generar y enviar un token de sesión aquí si es necesario
            let data= parsedUser(userf);
            // Genera el token
            const token = generateToken(userf);
            return { data, token };
          } else {
            // Contraseña incorrecta
            throw new Error("Email o password no validos");
          }
        } else {
          throw new Error("Usuario no registrado");
        }
      } catch (error) {
        throw error;
      }
};

const createUser = async(email, password)=>{
    // Método para registrar un nuevo usuario

    try {
        // Buscar el usuario por email
        const user = await User.findOne({
          where: {
            email: email,
            deleteAt: false,
          },
        });
    
        if (!user) {
            const nickname = email.split('@')[0];
          try {
            // Crear el nuevo usuario en la base de datos con la contraseña hasheada
            const newUser = await User.create({email: email, password: password, nickname: nickname, picture:`${USER_IMAGE}`,});
            const data = parsedUser(newUser);
            console.log('data'+data)
            const token = generateToken(newUser);
            return { data, token };
          } catch (error) {
            throw new Error("Error al crear el usuario");
          }
        } else if (user) {
          throw new Error("El usuario ya tiene cuenta");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
      }
}
 export {
    loginUser, 
    createUser
 };
