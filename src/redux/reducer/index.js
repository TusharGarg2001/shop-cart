import { combineReducers } from 'redux';
import productsReducer from './productReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import searchReducer from './searchReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  cart: cartReducer,
  search: searchReducer,
  theme: themeReducer,
});

export default rootReducer;