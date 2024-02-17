import style from './styles/Card.module.css'
import {NavLink} from 'react-router-dom';

function Card({characters}) {
  const {id, name, description, released, price, stock, Categories, Sizes, Images,}=characters;
    const image = Images[0];
   
    return (
      <div key= {id} className={style.cardContainer}>
        <img src={image} alt= 'Not found'/>
        <h2>$: {price}</h2>
        <NavLink to= {`/home/${id}`}>
        <p>{name}</p>
        </NavLink>
      
        
        

      </div>
    );
  }
  
  export default Card;
  