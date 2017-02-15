import axios from 'axios';
import * as actionTypes from '../constants/actionTypes';
const ROOT_URL = 'http://localhost:3000';

export const fetchProfile = () => (disptach) => {
  axios.get(`${ROOT_URL}/user/profile`).then(res => {
    disptach({
      type: actionTypes.FETCH_PROFILE,
      profile: res.data.user
    });
  });
}

export const updateProfile = (profile) => (dispatch) => {
  axios.post(`${ROOT_URL}/user/profile`, profile).then(() => {
    dispatch({
      type: actionTypes.UPDATE_PROFILE,
      profile: user
    });
  });
}