import style from './styles/Card.module.css'
import {NavLink} from 'react-router-dom';

function Card({characters}) {
  const {id, email, nickname, picture, role}=characters;
    return (
      <div key= {id} className={style.cardContainer}>
        <NavLink to= {`/home/${id}`}>
        <h2>Usuario: {nickname}</h2>
        </NavLink>
        <h4>{email}</h4>
        
        <img src={picture} alt = {'not found'}/>
        

      </div>
    );
  }
  
  export default Card;
  