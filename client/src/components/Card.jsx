import style from './styles/Card.module.css'
import {NavLink} from 'react-router-dom';

function Card({characters}) {
  const {id, name, description, released, price, stock, category, size, image,}=characters;
    return (
      <div key= {id} className={style.cardContainer}>
        <NavLink to= {`/home/${id}`}>
        <h2>{name}</h2>
        </NavLink>
        <h4>$: {price}</h4>
        <p>Descripción: {description}</p>
        
        {/* <img src={image[0].images} alt = {'not found'}/> */}
        

      </div>
    );
  }
  
  export default Card;
  