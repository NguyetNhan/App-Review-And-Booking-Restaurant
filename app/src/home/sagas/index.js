import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_LIST_RESTAURANT } from '../actions/action_types';
import { onFetchListRestaurantFailed, onFetchListRestaurantSucceeded } from '../actions';
import { API } from './API';

function* FetchListRestaurantFromAPI (action) {
        try {
                const results = yield API.fetchListRestaurantFormAPI(action.data);
                yield put(onFetchListRestaurantSucceeded(results));
        } catch (error) {
                console.log('error: ', error);
                yield put(onFetchListRestaurantFailed(error.message));
        }
}

export function* WatchFetchListRestaurantFromAPI () {
        yield takeLatest(FETCH_LIST_RESTAURANT, FetchListRestaurantFromAPI);
}