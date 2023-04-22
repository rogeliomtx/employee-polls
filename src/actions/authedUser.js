import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { login as apiLogin } from '../utils/api';

export const SET_AUTHED_USER = 'SET_AUTHED_USER';

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function handleLogin(id, password) {
  return (dispatch) => {
    showLoading();
    return apiLogin(id, password).then((user) => {
      if (user) {
        dispatch(setAuthedUser(user.id));
        return user;
      }
      return null;
    }).then(() => hideLoading());
  }
}

export function handleLogout() {
  showLoading();
  return (dispatch) => {
    dispatch(setAuthedUser(null));
    hideLoading();
    return true;
  }
}