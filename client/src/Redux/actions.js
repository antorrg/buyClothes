import axios from 'axios'
import { setAuthHeader } from '../Auth/axiosUtils';
import {HandlError, showSuccess}from '../Auth/HandlerError'
export const LOGIN_USER= 'LOGIN_USER';
export const ALL_USERS= 'ALL_USERS';
export const USER_BY_ID='USER_BY_ID';
export const CLEAN_DETAIL='CLEAN_DETAIL';
export const CLEAN_FILTERS='CLEAN_FILTERS';
export const ISN_AUTH= 'ISN_AUTH'
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const PROD_BY_ID = 'PROD_BY_ID';
export const GET_SIZES= 'GET_SIZES';
export const GET_COLOR= 'GET_COLOR'

export const getAllUsers = ()=>{
  return async (dispatch)=>{
    try {
      const data = await axios("/user");
      return dispatch({
        type:ALL_USERS,
        payload: data.data,
      })
    } catch (error) {
      HandlError(error)
      //alert("Could not get the users");
    }
  }
}
export const getById = (id, token) => async (dispatch) => {
  try {
    const data = await axios(`/user/${id}`, setAuthHeader(token));
    return dispatch({
      type: USER_BY_ID,
      payload:data.data,
    });
  } catch (error) {
    HandlError(error)
    //console.error('Error fetching game', error);
  }
};
export const cleanData =()=> (dispatch)=>{
  return dispatch({
    type: CLEAN_DETAIL,
    payload: [],
  })
}
export const cleanFilters =()=> (dispatch)=>{
  return dispatch({
    type: CLEAN_FILTERS,
    payload: [],
  })
}
export const loginUser = (payload) => (dispatch)=>{
        return dispatch({
          type: LOGIN_USER,
          payload: payload,
        });
      
  };
export const isNotAuth =()=>(dispatch)=>{
  return dispatch({
    type:ISN_AUTH,
    payload: [],
  })
}

//? Rutas y actions relativas a productos:
export const getAllProducts = (page)=>{
  return async (dispatch)=>{
    try {
      const data = await axios(`/?page=${page}`);
      return dispatch({
        type:GET_PRODUCTS,
        payload: data.data,
      })
    } catch (error) {
      HandlError(error)
      //alert("Could not get the users");
    }
  }
}

export const productById = (id, size, color, token) => async (dispatch) => {
  try {
    const data = await axios(`/${id}?size=${size}&color=${color}`, setAuthHeader(token));
    return dispatch({
      type: PROD_BY_ID,
      payload:data.data,
    });
  } catch (error) {
    HandlError(error)
    //console.error('Error fetching game', error);
  }
};


export const resetFilters = (id) => async (dispatch) => {
  const data = await axios(`/${id}`);
    return dispatch({
      type: PROD_BY_ID,
      payload: data.data,
    });
  
};