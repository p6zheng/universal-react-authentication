import axios from 'axios';
import * as actionTypes from '../constants/actionTypes';
const ROOT_URL = 'http://localhost:3000';
import cookie from 'react-cookie';

export const signinUser = (user) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_USER_REQUEST });

  axios.post(`${ROOT_URL}/auth/signin`, user)
    .then(
      () => {
        const userName = cookie.load('user_name');
        const userPhoto = cookie.load('user_photo');
        dispatch({
          type: actionTypes.AUTH_USER_SUCCESS,
          userName,
          userPhoto
        });
      },
      error => {
        dispatch({
          type: actionTypes.SIGNIN_ERROR,
          error: error.response.data.message
        });
      }
    )
}

export const signupUser = (user) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_USER_REQUEST });

  axios.post(`${ROOT_URL}/auth/signup`, user)
    .then(
      () => {
        const userName = cookie.load('user_name');
        const userPhoto = cookie.load('user_photo');
        dispatch({
          type: actionTypes.AUTH_USER_SUCCESS,
          userName,
          userPhoto
        });
      },
      error => {
        dispatch({
          type: actionTypes.SIGNUP_ERROR,
          error: error.response.data.message
        });
      }
    )
}

export const fetchMessage = () => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_MESSAGE_REQUEST });

  axios.get(`${ROOT_URL}/auth/secret`).then(
    response => {
      dispatch({
        type: actionTypes.FETCH_MESSAGE_SUCCESS,
        message: response.data
      });
    },
    error => {
      dispatch({
        type: actionTypes.FETCH_MESSAGE_ERROR,
        error: error.response.data.message
      })
    }
  );
}

export const signoutUser = () => {
  cookie.remove('token');
  cookie.remove('user_name');
  cookie.remove('user_id');
  cookie.remove('user_photo');
  return {
    type: actionTypes.UNAUTH_USER
  };
}

export const unmountComponent = () => {
  return {
    type: actionTypes.UNMOUNT_COMPONENT
  };
}
