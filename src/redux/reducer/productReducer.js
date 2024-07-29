  import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_PRODUCT,
    UPDATE_PRODUCT
  } from '../action/productActions';
  
  const initialState = {
    loading: false,
    products: [],
    error: null
  };
  
  const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_PRODUCTS_SUCCESS:
        return {
          loading: false,
          products: action.payload,
          error: null
        };
      case FETCH_PRODUCTS_FAILURE:
        return {
          loading: false,
          products: [],
          error: action.payload
        };
      case ADD_PRODUCT:
        return {
          ...state,
          products: [...state.products, action.payload]
        };
      case UPDATE_PRODUCT:
        
        return {
          
          ...state,
          products: state.products.map((product) =>
            product.id === action.payload.id ? { ...product, ...action.payload } : product
          ) ,
          
        };
      default:
        return state;
    }
  };
  
  export default productsReducer;
  