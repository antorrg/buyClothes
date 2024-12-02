

const parserUser = (u)=>{
  return {
    id: u.id,
    email: u.email,
    nickname: u.nickname,
    name: u.name || 'unknown',
    surname: u.surname || 'unknown',
    picture: u.picture,
    role: userScope(u.role),
    country: u.country || 'unknown',
    enable: parserEnable(u.enable),
    deleteAt: u.deleteAt,
  }
}
const parserEnable = (value)=>{
  if(value===true){
    return 'active'
  }else{
    return 'bloqued'
  }
}
const userScope = (value)=>{
  switch (value){
     
    case 2 :
      return 'Moderator'
    case 3 :
      return 'Admin'
    case 9 :
      return 'SAdmin'
    case 1:
      return 'User'
    default : 
      return 'User'
  }
}
  
 export default parserUser;
