// authActions.js

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_CREDENTIALS = 'SET_CREDENTIALS';
export const UPDATE_CREDENTIAL = 'UPDATE_CREDENTIAL';
export const LOGOUT = 'LOGOUT';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const setCredentials = (credentials) => ({
  type: SET_CREDENTIALS,
  payload: credentials,
});

export const updateCredential = (updatedCredential) => ({
  type: UPDATE_CREDENTIAL,
  payload: updatedCredential,
});

export const logout = () => ({
  type: LOGOUT,
});


export const ADD_USER = 'ADD_USER';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});
