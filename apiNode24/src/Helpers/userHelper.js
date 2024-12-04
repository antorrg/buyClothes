import env from '../envConfig.js'

 const userParser = (data, user) => {
    const roleParsed = user ? scope(data.role) : data.role;
    return {
        id: data.id,
        email: data.email,
        nickname: data.nickname,
        given_name: data.given_name,
        picture: data.picture,
        role: roleParsed,
        country: data.country,
        enable: data.enable,
    };
 };
const scope = (role)=>{
    switch(role){
      case 0:
      return "Admin"
      case 2 : 
      return "Moderator"
      case 9 :
      return "SAdmin"
      case 1 :
      default :
      return "User"
    }
}
const revertScope = (role)=>{
    switch(role){
      case "Admin":
      return 3;
      case "Moderator": 
      return 2;
      case "SAdmin":
      return 1
      case "User":
      default :
      return 1
    }
}
const emptyUser = ()=>{
    return [{ 
        id: false,
        email: 'No hay datos aun',
        nickname: 'No hay datos aun',
        given_name: 'No hay datos aun',
        picture: env.userImg,
        role: 'No hay datos aun',
        country: 'No hay datos aun',
        enable: 'No hay datos aun',
    }]
}
const protectProtocol = (data)=>{
    return data.role === 9? true: false;
   }

const optionBoolean = (option)=>{
    if(option==='true'|| option === true){
        return true
    }else if(option==='false'|| option === false){
        return false;
    }else{
        return false;
    }
}



const imageFunctions = (info, newInfo)=>{
    if(info!== newInfo){
        return true;
    }else if(info=== newInfo){
        return false
    }else{
        return false
    }
}

export {
userParser,
scope,
revertScope,
emptyUser,
protectProtocol,
optionBoolean,
imageFunctions,
};
 

  