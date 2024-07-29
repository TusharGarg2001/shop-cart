import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_PRODUCTS_REQUEST,
  fetchProductsSuccess,
  fetchProductsFailure,
} from '../action/productActions';

function* fetchProducts() {
  try {
    const response = yield call(fetch, 'https://raw.githubusercontent.com/TusharGarg2001/product_data/main/product_details');
    const data = yield response.json();
    yield put(fetchProductsSuccess(data));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

function* productSaga() {
  yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchProducts);
}

export default productSaga;


