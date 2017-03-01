import axios from 'axios';
import * as actionTypes from '../constants/actionTypes';
import cookie from 'react-cookie';

const ROOT_URL = 'http://localhost:3000/api';

export const fetchProfile = () => (disptach) => {
  disptach({ type: actionTypes.FETCH_PROFILE_REQUEST });

  axios.get(`${ROOT_URL}/user/profile`).then(
    response => {
      disptach({
        type: actionTypes.FETCH_PROFILE_SUCCESS,
        profile: response.data.user
      });
    },
    error => {
      disptach({
        type: actionTypes.FETCH_PROFILE_ERROR,
        error: error.response.data.message
      });
    }
  );
}

export const updateProfile = (profile) => (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_PROFILE_REQUEST });

  axios.post(`${ROOT_URL}/user/profile`, profile).then(
    () => {
      dispatch({
        type: actionTypes.UPDATE_PROFILE_SUCCESS,
        profile
      });
    },
    error => {
      dispatch({
        type: actionTypes.UPDATE_PROFILE_ERROR,
        error: error.response.data.message
      });
    }
  );
}

export const fetchAccount = () => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_ACCOUNT_REQUEST });

  axios.get(`${ROOT_URL}/user/account`).then(
    res => {
      dispatch({
        type: actionTypes.FETCH_ACCOUNT_SUCCESS,
        account: res.data.user
      });
    },
    error => {
      dispatch({
        type: actionTypes.FETCH_ACCOUNT_ERROR,
        error: error.response.data.message
      })
    }
   );
}

export const updateAccount = (account) => (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_ACCOUNT_REQUEST });

  axios.post(`${ROOT_URL}/user/account`, account).then(
    () => {
      dispatch({
        type: actionTypes.UPDATE_ACCOUNT_SUCCESS,
        account
      });
    },
    error => {
      dispatch({
        type: actionTypes.UPDATE_ACCOUNT_ERROR,
        error: error.response.data.message
      })
    }
  );
}

export const uploadPhoto = (photo) => (dispatch) => {
  let data = new FormData();
  data.append('photo', photo);

  dispatch({ type: actionTypes.UPLOAD_IMAGE_REQUEST });

  axios.post(`${ROOT_URL}/user/photo`, data).then(
    response => {
      const userPhoto = cookie.load('user_photo');
      dispatch({
        type: actionTypes.UPLOAD_IMAGE_SUCCESS,
        userPhoto,
        message: response.data.message
      });
    },
    error => {
      dispatch({
        type: actionTypes.UPLOAD_IMAGE_ERROR,
        error: error.response.data.message
      })
    }
  );
}

export const unmountComponent = () => {
  return {
    type: actionTypes.UNMOUNT_COMPONENT
  };
}
