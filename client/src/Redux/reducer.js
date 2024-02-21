import {
    LOGIN_USER,
    ISN_AUTH,
    ALL_USERS, 
    USER_BY_ID,
    CLEAN_DETAIL,
    GET_PRODUCTS,
    PROD_BY_ID,
} from './actions';

const initialState ={
    allUsers:[],
    LogIn:[],
    isAuthenticate: false,
    detailUsers:[],
    products:[],
    prodById:[],
    detailProd: [],
    prodByName:[]
};

const reducer = (state=initialState, {type, payload})=>{
    switch(type){
        case LOGIN_USER:
            console.log('usuario comun reducer  '+payload)
            return {
                ...state,
                LogIn: payload,
                isAuthenticate:true,
            }
        case ISN_AUTH:
            return {
                ...state,
                LogIn:payload,
                isAuthenticate: false,
            }
        case ALL_USERS:
            return {
                ...state,
                allUsers:payload,
            }
            case USER_BY_ID:
                return {
                    ...state,
                    detailUsers:payload,
                }
            case CLEAN_DETAIL:
                return {
                    ...state,
                    detailUsers: [],
                    prodById: [],
                }
//? Cases relativos a productos:
            case GET_PRODUCTS:
                return {
                    ...state,
                    products:payload,
                }
            case PROD_BY_ID:
                console.log('estoy en el reducer '+payload)
                return {
                    ...state,
                    prodById: payload,
                    detailProd: payload.Product1s,
                }
//------------------------------------------------------------------
        default:
            return{
                ...state,
            }
    }
}

export default reducer;