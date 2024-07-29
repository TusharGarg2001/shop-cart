import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_CREDENTIALS,
  UPDATE_CREDENTIAL,
  LOGOUT,
  ADD_USER,
} from '../action/authAction';

const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
  user: JSON.parse(localStorage.getItem('user')) || null,
  error: null,
  credentials: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case SET_CREDENTIALS:
      return {
        ...state,
        credentials: action.payload,
      };
    case UPDATE_CREDENTIAL:
      return {
        ...state,
        credentials: state.credentials.map((user) =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        ),
      };
      case ADD_USER:
      return {
        ...state,
        credentials: [...state.credentials, action.payload],
      };
    case LOGOUT:
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
