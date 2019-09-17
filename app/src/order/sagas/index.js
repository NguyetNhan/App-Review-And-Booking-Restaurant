import { put, takeLatest } from 'redux-saga/effects';
import { onFetchListMenuFailed, onFetchListMenuSucceeded, onAddOrderFailed, onAddOrderSucceeded } from '../actions';
import { FETCH_LIST_MENU_ORDER, ADD_ORDER } from '../actions/action_types';
import { API } from './API';

function* FetchListMenuForOrderFromAPI (action) {
        try {
                const results = yield API.FetchMenuFromAPI(action.data);
                if (results.error) {
                        yield put(onFetchListMenuFailed(results.message));
                } else {
                        yield put(onFetchListMenuSucceeded(results.data));
                }
        } catch (error) {
                yield put(onFetchListMenuFailed(error.message));
        }
}

export function* WatchFetchListMenuForOrderFromAPI () {
        yield takeLatest(FETCH_LIST_MENU_ORDER, FetchListMenuForOrderFromAPI);
}

function* AddOrderIntoDatabase (action) {
        try {
                const results = yield API.AddOrderIntoDatabase(action.data);
                if (results.error) {
                        yield put(onAddOrderFailed(results.messages));
                } else {
                        yield put(onAddOrderSucceeded(results));
                }
        } catch (error) {
                yield put(onAddOrderFailed(error.message));
        }
}

export function* WatchAddOrderIntoDatabase () {
        yield takeLatest(ADD_ORDER, AddOrderIntoDatabase);
}