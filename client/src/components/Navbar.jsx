import style from './styles/Navbar.module.css'
import {Link} from 'react-router-dom'
import GenericButton from './Buttons/GenericButton'
import { useAuth } from '../Auth/AuthContext/AuthContext'

const Navbar = () => {
  const {authenticated, user, logout}=useAuth();
  const allow = user? user.role : 1;
  //console.log(allow)
  return (
    <div className={style.nav}>
    <Link>
    <GenericButton onClick={logout} buttonText={'Logout'}/>
    </Link>
    <Link to={'/'}>
    <GenericButton buttonText={'LandingPage'}/>
    </Link>
    {authenticated?<>
     <div className={style.userDetails}>
        <h4>Bienvenido: {user.nickname&& user.nickname}</h4>
        <img src={user.picture} alt="Nor Found" />
      </div>
     </> : null
    }
    {allow===0 || allow===2 ?
    <Link to={'/admin'}><GenericButton buttonText={'AdminPanel'}/></Link>
    :null
    }
    <br></br>
   
    </div>
  )
}
export default Navbar