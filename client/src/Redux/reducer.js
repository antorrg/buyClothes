import {
  LOGIN_USER,
  ISN_AUTH,
  ALL_USERS,
  USER_BY_ID,
  CLEAN_DETAIL,
  GET_PRODUCTS,
  PROD_BY_ID,
  GET_COLOR,
  GET_SIZES,
} from "./actions";

const initialState = {
  allUsers: [],
  LogIn: [],
  isAuthenticate: false,
  detailUsers: [],
  products: [],
  prodById: [],
  detailProd: [],
  allDetailProd: [],
  prodByName: [],
};

const reducer = (state = initialState, { type, payload }) => {
    let selectsSizes = [...state.allDetailProd];
    let selectsColor = [...state.allDetailProd];

  switch (type) {
    case LOGIN_USER:
      //console.log('usuario comun reducer  '+payload)
      return {
        ...state,
        LogIn: payload,
        isAuthenticate: true,
      };
    case ISN_AUTH:
      return {
        ...state,
        LogIn: payload,
        isAuthenticate: false,
      };
    case ALL_USERS:
      return {
        ...state,
        allUsers: payload,
      };
    case USER_BY_ID:
      return {
        ...state,
        detailUsers: payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        detailUsers: [],
        prodById: [],
      };
    //? Cases relativos a productos: ======================================================================
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case PROD_BY_ID:
      console.log("estoy en el reducer " + payload);
      return {
        ...state,
        prodById: payload,
        detailProd: payload.Product1s,
        allDetailProd: payload.Product1s,
      };
      case GET_SIZES:
    console.log(payload);
    selectsSizes = [...state.allDetailProd];
    if (payload !== "All") {
      selectsSizes = selectsSizes.filter((prod) =>
        prod.sizes.includes(payload)
      );
    }
    if (selectsSizes.length === 0) {
      alert(
        "No hay prendas con este tamaño. Para buscar otro tamaño, vuelva el selector a la posición inicial."
      );
    }

  case GET_COLOR:
    console.log(payload);
    selectsColor = [...state.allDetailProd];
    if (payload !== "All") {
      selectsColor = selectsColor.filter((prod) =>
        prod.extras.includes(payload)
      );
    }

    if (selectsColor.length === 0) {
      alert(
        "No hay prendas con este color. Para buscar otro color, vuelva el selector a la posición inicial."
      );
    }
    
  // Combina ambas selecciones, utilizando solo los productos que cumplen ambas condiciones
  const combinedSelection = selectsSizes.filter((prod) =>
    selectsColor.some((selectedProd) => selectedProd.id === prod.id)
  );

  return {
    ...state,
    detailProd: combinedSelection,
  };
    //? +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
