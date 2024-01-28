import {Link}from 'react-router-dom'
import {useAuth} from '../Auth/AuthContext/AuthContext'
import GenericButton from '../components/Buttons/GenericButton'


const Error = () => {

   const {logout}=useAuth()
   

    const goBack = () => {
        logout(); // Llamar a la función de logout
     
    };
  
  return (
    <div>
     <h1>Error 404</h1>
     <h2>Page not found</h2>
     <Link link to = {'/'}>
      <GenericButton onClick={goBack} buttonText='Volver'/>
      </Link>
    

    </div>
  )
}

export default Error