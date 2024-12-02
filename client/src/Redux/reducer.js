import {
  LOGIN_USER,
  ISN_AUTH,
  ALL_USERS,
  USER_BY_ID,
  CLEAN_DETAIL,
  CLEAN_FILTERS,
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
  currentPage:1,
  totalPages: 1,
  loading:true,
  prodById: [],
  detailProd: [],
  prodByName: [],
};

const reducer = (state = initialState, { type, payload }) => {

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
        allDetailProd:[],
      };
      case CLEAN_FILTERS:
        return {
          ...state,
          detailProd: [],
        }
    //? Cases relativos a productos: ======================================================================
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload.results,
        currentPage: payload.info.currentPage,
        totalPages: payload.info.pages,
        loading: false,
      };
    case PROD_BY_ID:
      //console.log("estoy en el reducer " + payload);
      return {
        ...state,
        prodById: payload,
        detailProd: payload.Product1s,
       // allDetailProd: payload.Product1s,
      };
  //!--------------------------------------------------------------------------------------------
    //? +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
