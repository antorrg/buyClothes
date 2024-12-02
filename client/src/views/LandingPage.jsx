import {useNavigate}from 'react-router-dom'
import GenericButton from '../components/Buttons/GenericButton';
import { useAuth } from '../Auth/AuthContext/AuthContext'


function Landing() {
  const {authenticated}=useAuth();
  //console.log(authenticated)
  const navigate = useNavigate()

  const onChange=()=>{
    if(authenticated){
      navigate('/home')
    }else{
      navigate('/form')
    }

  };
    return (
      <div className="App">

      <h1>
        Yo soy la Landing Page
      </h1>
      <p>(Creo que me faltan estilos )</p>
      <br/>
      <GenericButton onClick={onChange} buttonText='Ingresar/Registrarse'/>
     
    
          
        
      </div>
    );
  }
  
  export default Landing;

  