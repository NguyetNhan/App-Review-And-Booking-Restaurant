import { put, takeLatest } from 'redux-saga/effects';
import {
        FETCH_DETAIL_ORDER,
} from '../actions/types';
import { onFetchDetailOrderFailed, onFetchDetailOrderSucceeded } from '../actions';
import { API } from './API';

function* fetchDetailOrderFromAPI (action) {
        try {
                const results = yield API.fetchDetailOrder(action.idOrder);
                if (results.error) {
                        yield put(onFetchDetailOrderFailed(results.messages));
                } else {
                        yield put(onFetchDetailOrderSucceeded(results.data));
                }
        } catch (error) {
                yield onFetchDetailOrderFailed(error.message);
        }
}

export function* watchFetchDetailOrderFromAPI () {
        yield takeLatest(FETCH_DETAIL_ORDER, fetchDetailOrderFromAPI);
}