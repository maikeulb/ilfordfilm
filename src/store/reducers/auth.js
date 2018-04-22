import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  redirect: false,
  error: null,
  user: null,
  auth: true
};

const authLogin = (state, action) => {
  return updateObject( state, { 
    user: action.user,
    auth: true,
  } );
};

const authFail = (state, action) => {
  return updateObject( state, {
    error: action.error,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { 
    redirect: true,
    auth: true,
    user: null
  });
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.AUTH_LOGIN: return authLogin(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
