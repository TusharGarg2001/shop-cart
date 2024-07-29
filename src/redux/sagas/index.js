import { all } from 'redux-saga/effects';
import productSaga from './productSagas';
import watchLogin from './authSaga';

export default function* rootSaga() {
  yield all([
    productSaga(),
    watchLogin(),
  ]);
}



