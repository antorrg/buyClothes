import CardUser from './CardUser'
import style from '../styles/Cards.module.css'


function CardsUser({character}) {
    return (
      <div className={style.cardList}>
        {character &&character.map((char)=>
        <CardUser characters = {char} key={char.id}/>)}
      </div>
    );
  }
  
  export default CardsUser;
  