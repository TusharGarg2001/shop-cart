
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const ADD_PRODUCT = 'ADD_PRODUCT';


export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product
});

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product
});



