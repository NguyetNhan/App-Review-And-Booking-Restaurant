import { API } from './API';
import { put, takeLatest } from 'redux-saga/effects';
import { LOGIN, ADD_ACCOUNT_INTO_LOCAL } from '../actions/action_types';
import { onLoginResults, onAddAccountIntoLocalResults } from '../actions';
import { DatabaseLocal } from './database_local';

function* LoginUser (action) {
        try {
                const result = yield API.Login(action.data);
                yield put(onLoginResults(result));
        } catch (error) {
                console.log('error: ', error.message);
        }
}

export function* WatchLogin () {
        yield takeLatest(LOGIN, LoginUser);
}

function* AddAccountIntoLocal (action) {
        try {
                const results = yield DatabaseLocal.AddAccountIntoLocal(action.data);
                console.log('results: ', results);
                yield put(onAddAccountIntoLocalResults(results));
        } catch (error) {
                console.log('error: ', error);
        }
}

export function* WatchAddAccount () {
        yield takeLatest(ADD_ACCOUNT_INTO_LOCAL, AddAccountIntoLocal);
}