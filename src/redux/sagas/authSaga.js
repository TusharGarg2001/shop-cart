import { takeLatest, call, put } from 'redux-saga/effects';
import { LOGIN_REQUEST, setCredentials, loginFailure } from '../action/authAction';

function* fetchCredentials() {
  try {
    const response = yield call(fetch, 'https://raw.githubusercontent.com/TusharGarg2001/product_data/main/login_credentials');
    const data = yield response.json();
    yield put(setCredentials(data));
  } catch (error) {
    yield put(loginFailure('Failed to fetch credentials'));
  }
}

export default function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, fetchCredentials);
}

