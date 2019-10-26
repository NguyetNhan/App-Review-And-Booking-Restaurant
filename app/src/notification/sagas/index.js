import { put, takeLatest } from 'redux-saga/effects';
import { API } from './API';
import { onFetchNotificationFailed, onFetchNotificationSucceeded } from '../actions';
import { FETCH_NOTIFICATION } from '../actions/action_types';

function* FetchNotificationFromAPI (action) {
        try {
                const results = yield API.fetchNotificationFromAPI(action.data);
                if (results.error) {
                        yield put(onFetchNotificationFailed(results.message));
                } else {
                        yield put(onFetchNotificationSucceeded(results));
                }
        } catch (error) {
                yield put(onFetchNotificationFailed(error.message));
        }
}

export function* WatchFetchNotificationFromAPI () {
        yield takeLatest(FETCH_NOTIFICATION, FetchNotificationFromAPI);
}