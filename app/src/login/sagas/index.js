import { API } from './API';
import { put, takeLatest } from 'redux-saga/effects';
import { LOGIN, ADD_ACCOUNT_INTO_LOCAL } from '../actions/action_types';
import {
        onLoginFailed,
        onLoginSucceeded,
        onAddAccountIntoLocalFailed,
        onAddAccountIntoLocalSucceeded
} from '../actions';
import { databaseLocal } from './database_local';

function* loginUser (action) {
        try {
                const result = yield API.login(action.data);
                if (result.error) {
                        yield put(onLoginFailed(result.message));
                } else {
                        yield put(onLoginSucceeded(result.data, result.message));
                }
        } catch (error) {
                yield put(onLoginFailed(error.message));
        }
}

export function* watchLogin () {
        yield takeLatest(LOGIN, loginUser);
}

function* addAccountIntoLocal (action) {
        try {
                const result = yield databaseLocal.addAccountIntoLocal(action.data);
                if (result.error) {
                        yield put(onAddAccountIntoLocalFailed(result.message));
                } else {
                        yield put(onAddAccountIntoLocalSucceeded(result.message));
                }
        } catch (error) {
                yield put(onAddAccountIntoLocalFailed(error.message));
        }
}

export function* watchAddAccount () {
        yield takeLatest(ADD_ACCOUNT_INTO_LOCAL, addAccountIntoLocal);
}