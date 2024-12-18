import style from "./styles/Detail.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoleName, statusUser } from "../utils/RoleName";
import GenericButton from "../components/Buttons/GenericButton";
import EditWindow from "../components/EditComponents/ModalEdit";
import { productById, resetFilters, cleanData } from "../Redux/actions";
import { useAuth } from "../Auth/AuthContext/AuthContext";
import InnerDetail from "../components/InnerDetail";

const Detail = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useSelector((state) => state.prodById);
  //?=============== Esta es la parte de las variantes ======================================================
  const proById = useSelector((state) => state.detailProd);
 const [size, setSize] = useState('')
 const [color, setColor] = useState('')
 const [resetKey, setResetKey] = useState(0);

 
  const goBack = () => {
    navigate(-1);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleEditWindowClose = () => {
    setIsModalOpen(false);
  };

  const token = localStorage.getItem("validToken");

  useEffect(() => {
    dispatch(cleanData());

    dispatch(productById(id, size, color, token));
    return ()=>{dispatch(cleanData())}
  }, [dispatch, id, size, color, cleanData]);
 
  useEffect(()=>{
    dispatch(resetFilters(id))
  },[resetKey])

  const resetSelects = ()=>{
    setResetKey(prevKey => prevKey + 1)
    setSize('')
    setColor('')
  }
  const puedeEditar = user && user.role === 0||user.role=== 2;
  //const status = statusUser(product.enable);
  //console.log('yo soy user '+user.id)

  return (
    <div className={style.body}>
      <div className={style.cont}>
        <br />
        <br />
    
          {proById &&(
          <InnerDetail proById={proById} size={setSize} color = {setColor}resetSelects={resetSelects}/>
          )}
        <div className={style.text}>
          {puedeEditar && puedeEditar ? (
            <GenericButton
              onClick={handleEditClick}
              buttonText="Editar"
              userEdit={proById}
            />
          ) : null}
          {isModalOpen && (
            <EditWindow onClose={handleEditWindowClose} productEdit={proById} />
          )}
          <h2>{product?.name}</h2>
          <p>Descripcion: {product?.description}</p>
          <h3>Genero: {product?.Genres}</h3>
          <p>Marca: {product?.Trademarcks}</p>
          <GenericButton onClick={goBack} buttonText="Volver" />
        </div>
      </div>
    </div>
  );
};

export default Detail;
