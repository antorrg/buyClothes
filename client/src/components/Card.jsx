import style from './styles/Card.module.css'
import {NavLink} from 'react-router-dom';
import ParsedImages from './ParsedImages/ParsedImages';

function Card({characters}) {
  const {id, name, price, }=characters;
    
   
    return (
      <div key= {id} className={style.cardContainer}>
        <div>
      <ParsedImages objeto = {characters}/>
      </div >
        <h2>$: {price}</h2>
        <NavLink to= {`/home/${id}`}>
        <p>{name}</p>
        </NavLink>
      
        
        

      </div>
    );
  }
  
  export default Card;
  