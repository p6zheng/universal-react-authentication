import axios from 'axios';
import * as actionTypes from '../constants/actionTypes';
const ROOT_URL = 'http://localhost:3000';
import cookie from 'react-cookie';

export const signinUser = (user) => (dispatch) => {
  axios.post(`${ROOT_URL}/auth/signin`, user)
    .then(() => {
      const userName = cookie.load('user_name');
      dispatch({
        type: actionTypes.AUTH_USER,
        userName
      });
    })
    .catch(error => {
      dispatch(auth_error('Incorrect info. Please provide the correct email and password'));
    });
}

export const signupUser = (user) => (dispatch) => {
  axios.post(`${ROOT_URL}/auth/signup`, user)
    .then(() => {
      const userName = cookie.load('user_name');
      dispatch({
        type: actionTypes.AUTH_USER,
        userName
      });
    })
    .catch(error => {
      dispatch(auth_error(error.message));
    });
}

export const fetchMessage = () => (dispatch) => {
  axios.get(`${ROOT_URL}/auth/secret`).then(res => {
      dispatch({
        type: actionTypes.FETCH_MESSAGE,
        message: res.data
      })
    }).catch(error => console.log(error));
}

const auth_error = (error) => ({
  type: actionTypes.AUTH_ERROR,
  error
});

export const signoutUser = () => {
  cookie.remove('token');
  cookie.remove('user_name');
  cookie.remove('user_id');
  return {
    type: actionTypes.UNAUTH_USER
  };
}
