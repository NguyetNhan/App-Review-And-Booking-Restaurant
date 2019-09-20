import { put, takeLatest } from 'redux-saga/effects';
import { onFetchListOrderFailed, onFetchListOrderSucceeded } from '../actions';
import { FETCH_LIST_ORDER } from '../actions/action_types';
import { API } from './API';

function* FetchListOrderFromAPI (action) {
        if (action.data.type === 'admin-restaurant') {
                try {
                        let results = yield API.FetchListOrderForAdminRestaurant(action.data.data);
                        if (results.error) {
                                yield put(onFetchListOrderFailed(results.message));
                        } else {
                                yield put(onFetchListOrderSucceeded(results));
                        }
                } catch (error) {
                        yield put(onFetchListOrderFailed(error.message));
                }
        } else if (action.data.type === 'client') {
                try {
                        let results = yield API.FetchListOrderForClient(action.data.data);
                        if (results.error) {
                                yield put(onFetchListOrderFailed(results.message));
                        } else {
                                yield put(onFetchListOrderSucceeded(results));
                        }
                } catch (error) {
                        yield put(onFetchListOrderFailed(error.message));
                }
        }
}

export function* WatchFetchListOrderFromAPI () {
        yield takeLatest(FETCH_LIST_ORDER, FetchListOrderFromAPI);
}