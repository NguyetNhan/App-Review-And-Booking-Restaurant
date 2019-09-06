import { put, takeLatest } from 'redux-saga/effects';
import { onFetchListMenuFailed, onFetchListMenuSucceeded } from '../actions';
import { FETCH_LIST_MENU_ORDER } from '../actions/action_types';
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
                console.log('error: ', error);
        }
}

export function* WatchFetchListMenuForOrderFromAPI () {
        yield takeLatest(FETCH_LIST_MENU_ORDER, FetchListMenuForOrderFromAPI);
}