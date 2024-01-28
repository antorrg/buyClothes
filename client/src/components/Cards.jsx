import Card from '../components/Card'
import style from './styles/Cards.module.css'

function Cards({character}) {
    return (
      <div className={style.cardList}>
        {character &&character.map((char)=>
        <Card characters = {char} key={char.id}/>)}
      </div>
    );
  }
  
  export default Cards;
  