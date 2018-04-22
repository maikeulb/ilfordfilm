import { firebase, googleProvider } from '../../firebase';

import * as actionTypes from './actionTypes';

export const authLogin = (user) => {
  return {
    type: actionTypes.AUTH_LOGIN,
    user: user
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export function verifyAuth() {
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authLogin(user));
      } else {
        dispatch(authLogout());
      }
    });
  }
}

export const startLogout = () => {
  return dispatch => {
    firebase.auth().signOut()
      .then(response => {
        dispatch(authLogout());
      })
      .catch(err => {
        dispatch(authFail(err.response));
      });
  };
};

export const startLogin = () => {
  return dispatch => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(response => {
         dispatch(authLogin(response.user));
      })
      .catch(err => {
         dispatch(authFail(err.message));
      });
  };
};
