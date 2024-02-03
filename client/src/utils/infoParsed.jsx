
const userInfo =()=>{
    const data = localStorage.getItem('user');
    const result =data.user;
    console.log(result, 'soy la info preparada')
    return result;
}

export default userInfo;