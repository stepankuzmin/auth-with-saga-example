import { call, put, takeLatest } from 'redux-saga/effects';

import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from './reducer';

const authMock = (login, password) =>
  new Promise((resolve, reject) => {
    if (login === 'root' && password === 'root') {
      resolve({ token: 'secret-token' });
    } else {
      reject({ status: 401 });
    }
  });

function* authorize({ payload: { login, password } }) {
  try {
    const { token } = yield call(authMock, login, password);
    yield put({ type: AUTH_SUCCESS, payload: token });
    localStorage.setItem('token', token);
  } catch (error) {
    let message;
    switch (error.status) {
      case 500: message = 'Internal Server Error'; break;
      case 401: message = 'Invalid credentials'; break;
      default: message = 'Something went wrong';
    }
    yield put({ type: AUTH_FAILURE, payload: message });
    localStorage.removeItem('token');
  }
}

function* Saga() {
  yield takeLatest(AUTH_REQUEST, authorize);
}

export default Saga;
