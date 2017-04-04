import * as actionTypes from '../constants/actionTypes';
import api from '../utils/apiCaller';

export const signinUser = (user) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_USER_REQUEST });

  api('auth/signin', 'post', user)
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
          error: error.response.data.message
        });
      }
    );
};

export const signupUser = (user) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_USER_REQUEST });

  api('auth/signup', 'post', user)
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
          error: error.response.data.message
        });
      }
    );
};

export const fetchMessage = () => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_MESSAGE_REQUEST });

  api('auth/secret').then(
    res => {
      dispatch({
        type: actionTypes.FETCH_MESSAGE_SUCCESS,
        message: res.data
      });
    },
    error => {
      dispatch({
        type: actionTypes.FETCH_MESSAGE_ERROR,
        error: error.response.data.message
      });
    }
  );
};

export const unmountComponent = () => ({
  type: actionTypes.UNMOUNT_COMPONENT
});

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
