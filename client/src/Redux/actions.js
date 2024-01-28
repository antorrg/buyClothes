import axios from 'axios'
import {HandlError, showSuccess}from '../Auth/HandlerError'
export const LOGIN_USER= 'LOGIN_USER';
export const ALL_USERS= 'ALL_USERS';
export const USER_BY_ID='USER_BY_ID';
export const CLEAN_DETAIL='CLEAN_DETAIL';
export const ISN_AUTH= 'ISN_AUTH'

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
export const getById = (id) => async (dispatch) => {
  try {
    const data = await axios(`/user/${id}`);
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
export const loginUser = (payload) => (dispatch)=>{
        return dispatch({
          type: LOGIN_USER,
          payload: payload,
        });
      
  };
export const isNotAuth =(payload)=>{
  return dispatch({
    type:ISN_AUTH,
    payload: payload,
  })
}