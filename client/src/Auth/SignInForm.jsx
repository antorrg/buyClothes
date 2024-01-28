import style from '../components/styles/ModalEdit.module.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidCreate } from '../utils/Validate';
import { createUser } from './Auth';
import GenericButton from '../components/Buttons/GenericButton';

const SignInForm = ({auth}) => {
  const {login} = auth;
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
    <GenericButton type='submit' buttonText={'Crear Usuario'}/>
      </form>
    </div>
  );
};

export default SignInForm;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";
// import {ValidCreate} from '../utils/Validate'
// import {createUser}from './Auth'

// const SignInForm = () => {
//   const [input, setInput] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const navigate = useNavigate();

//   function handleChange(event) {
//     const { name, value } = event.target;
//     setInput({
//       ...input,
//       [name]: value,
//     });
  
//     setError((prevError) => ({
//       ...prevError,
//       [name]:
//         name === "confirmPassword" && input.confirmPassword !== value
//           ? "Passwords do not match"
//           : ValidCreate({ ...input, [name]: value })[name],
//     }));
//   }
   

// //  const handleSubmit = async(event)=>{
// //     event.preventDefault();

// //     if (Object.keys(error).every(key => error[key] === "")) {
// //       await createUser(input);
// //       setInput({
// //         email: "",
// //         password: "",
// //         confirmPassword: "",
// //       });
// //       navigate("/home");
// //       alert("User logged successfully");
// //     }
// //   }
// const handleSubmit = async (event) => {
//   event.preventDefault();

//   const validationErrors = ValidCreate(input);
//   setError(validationErrors);

//   if (Object.values(validationErrors).every((error) => error === "")) {
//     await createUser(input);
//     setInput({
//       email: "",
//       password: "",
//       confirmPassword: "",
//     });
//     navigate("/home");
//     alert("User logged successfully");
//   }
// };
//   return (
//     <div>
//       <form onSubmit={(event) => handleSubmit(event)}>
//         <div>
//           <NavLink to="/home">
//             <button> Cancel </button>
//           </NavLink>
//         </div>
//         <div >
//           <input
//             type="text"
//             placeholder="email"
//             value={input.email}
//             name="email"
//             autoComplete="off"
//             onChange={(event) => handleChange(event)}
//             className=''
//           />
//           <label > Email: </label>
//           {error.email && <p className=''>{error.email}</p>}
//         </div>
//         <div>
//           <input
//             type="password"
//             placeholder="password"
//             value={input.password}
//             name="password"
//             autoComplete="off"
//             onChange={(event) => handleChange(event)}
//             className=''
//           />
//           <label > Password: </label>
//           {error.password && <p className=''>{error.password}</p>}
//         </div>
//         <div>
//   <input
//     type="password"
//     placeholder="confirm password"
//     value={input.confirmPassword}
//     name="confirmPassword"
//     autoComplete="off"
//     onChange={(event) => handleChange(event)}
//     className=''
//   />
//   <label > Confirm Password: </label>
//   {error.confirmPassword && <p className=''>{error.confirmPassword}</p>}
// </div>
//         <button type="submit">Iniciar Sesión</button>
//       </form>
//     </div>
//   );
// };
// export default SignInForm;