
export const userParser  = ({info})=>{
  return {  
    id: info.id,
    email: info.email,
    password: info.password,
    nickname:info.nickname,
    name: info.name,
    surname: info.surname,
    picture: info.picture,
    role: info.role,
    country: info.country,
    enable: info.enable
  }
}
export const respUserCreate = {
    "id": expect.any(String),
    "email": "josenomeacuerdo@hotmail.com",
    "password": expect.any(String),
"nickname": "josenomeacuerdo",
"name": null,
"surname": null,
"picture": "url",
"role": 1,
"country": null,
"enable": true,
"deletedAt": false,
}
