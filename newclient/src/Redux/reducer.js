import{
    GET_PRODUCTS,
}from './actions'


const initialState = {
    products : [],
    currentPage: 1,
    totalPages: 1,
    loading: true,

};

const reducer = (state = initialState, {type, payload})=>{
    switch(type){
        case GET_PRODUCTS:
            return{
                ...state,
                products: payload,
            }
        default :
        return {
            ...state
        }
    }
};

export default reducer;