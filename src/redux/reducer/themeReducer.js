import { CHANGE_THEME } from '../action/themeAction';

const initialState = {
  theme: 'default', 
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export default themeReducer;









