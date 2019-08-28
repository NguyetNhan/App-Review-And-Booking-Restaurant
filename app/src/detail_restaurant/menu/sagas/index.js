import { put, takeLatest } from 'redux-saga/effects';
import { API } from './API';
import { onAddMenuFailed, onAddMenuSucceeded, onFetchMenuSucceeded, onFetchMenuFailed } from '../actions';
import { ADD_MENU, FETCH_MENU } from '../actions/action_types';

function* AddMenuOnAPI (action) {
        try {
                const results = yield API.AddMenuOnAPI(action.data);
                if (results.error) {
                        yield put(onAddMenuFailed(results.message));
                } else {
                        yield put(onAddMenuSucceeded(results));
                }
        } catch (error) {
                console.log('error: ', error);
        }
}

export function* WatchAddMenuOnAPI () {
        yield takeLatest(ADD_MENU, AddMenuOnAPI);
}

function* FetchMenuFromAPI (action) {
        try {
                const results = yield API.FetchMenuFromAPI(action.data);
                if (results.error) {
                        yield put(onFetchMenuFailed(results.message));
                } else {
                        yield put(onFetchMenuSucceeded(results.data));
                }
        } catch (error) {
                console.log('error: ', error);
        }
}

export function* WatchFetchMenuFromAPI () {
        yield takeLatest(FETCH_MENU, FetchMenuFromAPI);
}