import { put, takeLatest } from 'redux-saga/effects';
import { onFetchListOrderFailed, onFetchListOrderSucceeded } from '../actions';
import { FETCH_LIST_ORDER_FOR_ADMIN } from '../actions/action_types';
import { API } from './API';

function* FetchListOrderForAdminFromAPI (action) {
        try {
                const results = yield API.FetchListOrderForAdminRestaurant(action.data);
                if (results.error) {
                        yield put(onFetchListOrderFailed(results.message));
                } else {
                        yield put(onFetchListOrderSucceeded(results));
                }
        } catch (error) {
                yield put(onFetchListOrderFailed(error.message));
        }
}

export function* WatchFetchListOrderForAdminFromAPI () {
        yield takeLatest(FETCH_LIST_ORDER_FOR_ADMIN, FetchListOrderForAdminFromAPI);
}