import GenericButton from "./Buttons/GenericButton"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import style from './styles/Pagination.module.css'

const Pagination = ({page, setPage, totalPages, position}) => {
  const paginationClass = `${style.pagination} ${position ? style['pagination-top'] : style['pagination-bottom']}`;
  return (
    <div className={paginationClass}>
     <GenericButton buttonText={<FontAwesomeIcon icon={faAngleDoubleLeft} />} onClick={()=>setPage(Number(1))} disabled={page===Number(1)}/>
     <GenericButton buttonText={<FontAwesomeIcon icon={faAngleLeft} />} onClick={()=>setPage(Number(page-1))} disabled={page===Number(1)}/>
     <span className={style.span}>Page {page} of {totalPages}</span>
     <GenericButton buttonText={<FontAwesomeIcon icon={faAngleRight} />} onClick={()=>setPage(Number(page+1))} disabled={page==totalPages}/>
     <GenericButton buttonText={<FontAwesomeIcon icon={faAngleDoubleRight} />} onClick={()=>setPage(Number(totalPages))}disabled={page===totalPages} />
    </div>
  )
}

export default Pagination