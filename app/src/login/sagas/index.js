import { API } from './API';
import { put, takeLatest } from 'redux-saga/effects';
import { LOGIN } from '../actions/action_types';
import { onLoginResults } from '../actions';

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