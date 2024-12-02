import style from '../components/styles/LoginForm.module.css'
import { useState } from "react";
import GenericButton from '../components/Buttons/GenericButton';
import { useNavigate } from "react-router-dom";

import {ValidLogin} from '../utils/Validate';
import {loginUser}from './Auth'


const LoginForm = ({handleSignClick, auth}) => {
  const {login}=auth;
  const navigate = useNavigate();
  const onClose= ()=>{
    navigate("/")
  }
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });


  function handleChange(event) {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
    setError({
      ...error,
      [name]: ValidLogin({ ...input, [name]: value })[name],
    });
  }

 const handleSubmit = async(event)=>{
    event.preventDefault();
    //if (Object.keys(error).every(key => error[key] === "")) {
      //console.log(event)
      const user = await loginUser(input,login);
      setInput({
        email: "",
        password: "",
      });
      if(user){
      navigate("/home");
  
      }
    //}
  }
  const permit =
  !input.email.trim() ||
  !input.password.trim() ||
  error.email ||
  error.password;

  return (
    <div className={style.form}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div>
        <GenericButton onClick={onClose} buttonText={'Cancelar'}/>
        </div>
        <div >
          <label > Email: </label>
          <input
            type="text"
            placeholder="email"
            value={input.email}
            name="email"
            autoComplete="off"
            onChange={(event) => handleChange(event)}
            className=''
            />
          {error.email && <p className={style.errorMessage}>{error.email}</p>}
        </div>
        <div>
          <label > Password: </label>
          <input
            type="password"
            placeholder="password"
            value={input.password}
            name="password"
            autoComplete="off"
            onChange={(event) => handleChange(event)}
            className=''
          />
          {error.password && <p className={style.errorMessage}>{error.password}</p>}
        </div>
        <GenericButton type='submit' buttonText={'Iniciar Sesion'} disabled= {null} />
      </form>
      <h4>¿No tiene cuenta? Registrese:</h4>
      <GenericButton onClick={handleSignClick} buttonText={'Registrarse'} /> 
    </div>
  );
};

export default LoginForm
