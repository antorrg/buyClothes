import style from './styles/Error.module.css'
// import { useAuth } from "../Auth/AuthContext/AuthContext";
import GenericButton from "../components/Buttons/GenericButton";

const Error = () => {
  // const { logout } = useAuth();

  // const goBack = () => {

  //     logout(); // Llamar a la función de logout
  // };

  
  return (
      <div className={style.error}>
      <h1 className={style.cube}>Error 404</h1>
      <h2>Page not found</h2>
      
      </div>
  );
};

export default Error;
