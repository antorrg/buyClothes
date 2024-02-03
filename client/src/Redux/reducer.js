import {
    LOGIN_USER,
    ISN_AUTH,
    ALL_USERS, 
    USER_BY_ID,
    CLEAN_DETAIL
} from './actions';

const initialState ={
    allUsers:[],
    LogIn:[],
    isAuthenticate: false,
    detailUsers:[],
};

const reducer = (state=initialState, {type, payload})=>{
    switch(type){
        case LOGIN_USER:
            console.log(payload)
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
                }
        default:
            return{
                ...state,
            }
    }
}

export default reducer;