import axios from 'axios';
import * as actionTypes from '../constants/actionTypes';
const ROOT_URL = 'http://localhost:3000';

export const signinUser = (user) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_USER_REQUEST });

  axios.post(`${ROOT_URL}/auth/signin`, user)
    .then(
      res => {
        dispatch({
          type: actionTypes.AUTH_USER_SUCCESS,
          userName: res.data.userName,
          userPhoto: res.data.userPhoto
        });
      },
      error => {
        dispatch({
          type: actionTypes.SIGNIN_ERROR,
          error: error.res.data.message
        });
      }
    );
};

export const signupUser = (user) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_USER_REQUEST });

  axios.post(`${ROOT_URL}/auth/signup`, user)
    .then(
      res => {
        dispatch({
          type: actionTypes.AUTH_USER_SUCCESS,
          userName: res.data.userName,
          userPhoto: res.data.userPhoto
        });
      },
      error => {
        dispatch({
          type: actionTypes.SIGNUP_ERROR,
          error: error.res.data.message
        });
      }
    );
};

export const fetchMessage = () => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_MESSAGE_REQUEST });

  axios.get(`${ROOT_URL}/auth/secret`).then(
    res => {
      dispatch({
        type: actionTypes.FETCH_MESSAGE_SUCCESS,
        message: res.data
      });
    },
    error => {
      dispatch({
        type: actionTypes.FETCH_MESSAGE_ERROR,
        error: error.res.data.message
      });
    }
  );
};

export const signoutUser = () => {
  deleteCookie('token');
  deleteCookie('user_name');
  deleteCookie('user_id');
  deleteCookie('user_photo');
  return {
    type: actionTypes.UNAUTH_USER
  };
};

const deleteCookie = (name) => {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const unmountComponent = () => {
  return {
    type: actionTypes.UNMOUNT_COMPONENT
  };
};
