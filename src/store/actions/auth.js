import { firebase, googleProvider } from '../../firebase';

import * as actionTypes from './actionTypes';

export const authLogin = (userId) => {
  console.log(userId)
  return {
    type: actionTypes.AUTH_START,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const auth = () => {
  return dispatch => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(response => {
          console.log(response);
          dispatch(authLogin(response.user.uid));
      })
      .catch(err => {
          dispatch(authFail(err.response));
      });
  };
};
