import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store'
import { AUTH_USER_SUCCESS } from './constants/actionTypes';
import cookie from 'react-cookie';
import Root from './Root';

const store = configureStore();

const token = cookie.load('token');
const userName = cookie.load('user_name');
const userPhoto = cookie.load('user_photo');
if (typeof token !== 'undefined') {
  store.dispatch({
    type: AUTH_USER_SUCCESS,
    userName,
    userPhoto
  });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
