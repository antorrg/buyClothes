import style from './styles/Card.module.css'
import {NavLink} from 'react-router-dom';
import ParsedImages from './ParsedImages/ParsedImages';

function Card({characters}) {
  const {id, name }=characters;
  //console.log(characters.Product1s)
  const productoOrden1 = characters.Product1s.find(producto => producto.order === 1);
  //console.log(productoOrden1)  

    return (
      <div key= {id} className={style.cardContainer}>
        <div>
      <ParsedImages objeto = {productoOrden1}/>
      </div >
        <h2>$: {productoOrden1.price}</h2>
        <NavLink to= {`/home/${id}`}>
        <p>{name}</p>
        </NavLink>
      
        
        

      </div>
    );
  }
  
  export default Card;
  