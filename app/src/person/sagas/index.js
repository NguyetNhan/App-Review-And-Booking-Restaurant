import { put, takeLatest } from 'redux-saga/effects';
import {
        FETCH_ACCOUNT_VIEW
} from '../actions/types';
import {
        onFetchAccountViewFailed,
        onFetchAccountViewSucceeded
} from '../actions';
import { API } from './api';

function* fetchInfoAccountView (action) {
        try {
                const result = yield API.fetchInfoAccount(action.idAccountView);
                if (result.error) {
                        yield put(onFetchAccountViewFailed(result.message));
                } else {
                        yield put(onFetchAccountViewSucceeded(result.data));
                }
        } catch (error) {
                yield put(onFetchAccountViewFailed(error.message));
        }
}

export function* watchFetchInfoAccountViewFromAPIForPerson () {
        yield takeLatest(FETCH_ACCOUNT_VIEW, fetchInfoAccountView);
}