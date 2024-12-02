import style from '../components/styles/ModalEdit.module.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidCreate } from '../utils/Validate';
import { createUser } from './Auth';
import GenericButton from '../components/Buttons/GenericButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignInForm = ({auth}) => {
  const {login} = auth;
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [name]:
          name === "confirmPassword" && value !== input.password
        ? "Las contraseñas no coinciden"
        : ValidCreate({ ...input, [name]: value })[name],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = ValidCreate(input);
    setError(validationErrors);

    if (Object.values(validationErrors).every((error) => error === "")) {
      await createUser(input, login);
      setInput({
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/home");
    }
  };
  const permit =
  !input.email.trim() ||
  !input.password.trim() ||
  !input.confirmPassword.trim() ||
  error.email ||
  error.password ||
  error.confirmPassword;
  return (
    <div>
      <form onSubmit={handleSubmit}>
       <div>
         </div>
         <div >
           <input
             type="text"
             placeholder="email"
             value={input.email}
             name="email"
             autoComplete="off"
             onChange={(event) => handleChange(event)}
             className=''
           />
           <label > Email: </label>
           {error.email && <p className={style.errorMessage}>{error.email}</p>}
         </div>
         <div>
           <input
             type="password"
             placeholder="password"
             value={input.password}
             name="password"
             autoComplete="off"
             onChange={(event) => handleChange(event)}
             className=''
           />
             {/* <button type="button" onClick={() => { setShowPassword(!showPassword);}} style={{background:'transparent'}}>
                <i className={showPassword ? faEye : faEyeSlash}></i>
              </button> */}
           <label > Password: </label>
           {error.password && <p className={style.errorMessage}>{error.password}</p>}
         </div>
         <div>
      <input
        type="password"
        placeholder="confirm password"
        value={input.confirmPassword}
        name="confirmPassword"
        autoComplete="off"
        onChange={(event) => handleChange(event)}
        className=''
      />
      <label > Confirm Password: </label>
      {error.confirmPassword && <p className={style.errorMessage}>{error.confirmPassword}</p>}
    </div> 
    <GenericButton type='submit' buttonText={'Crear Usuario'} disabled = {permit}/>
      </form>
    </div>
  );
};

export default SignInForm;