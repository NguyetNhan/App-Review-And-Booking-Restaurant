import { put, takeLatest } from 'redux-saga/effects';
import {
        FETCH_STRANGER_LIST
} from '../actions/types';
import {
        onFetchStrangerListFailed,
        onFetchStrangerListSucceeded
} from '../actions';
import { API } from './api';
function* fetchStrangerListFromAPI (action) {
        try {
                const result = yield API.fetchStrangerList(action.idAccount, action.geolocation);
                if (result.error) {
                        yield put(onFetchStrangerListFailed(result.message));
                } else {
                        yield put(onFetchStrangerListSucceeded(result.data));
                }
        } catch (error) {
                yield put(onFetchStrangerListFailed(error.message));
        }
}

export function* watchFetchStrangerListFromAPI () {
        yield takeLatest(FETCH_STRANGER_LIST, fetchStrangerListFromAPI);
}