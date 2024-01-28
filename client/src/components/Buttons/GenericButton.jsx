import style from './GenericButton.module.css'


const GenericButton = ({onClick, buttonText, type='button'}) => {
 

  return (
    <button type={type} onClick={onClick} className={style.button}>
      {buttonText}
    </button>
  );
};

export default GenericButton;
