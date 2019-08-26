import { put, takeLatest } from 'redux-saga/effects';
import { onSearchRestaurantSucceeded, onSearchRestaurantFailed } from '../actions';
import { SEARCH_RESTAURANT } from '../actions/action_types';
import { API } from './API';
function* SearchRestaurantFromAPI (action) {
        try {
                const results = yield API.SearchRestaurantFromAPI(action.data);
                if (results.error) {
                        yield put(onSearchRestaurantFailed(results.message));
                } else {
                        yield put(onSearchRestaurantSucceeded(results.data));
                }
        } catch (error) {
                console.log('SearchRestaurantFromAPI error : ', error);
        }
}

export function* WatchSearchRestaurantFromAPI () {
        yield takeLatest(SEARCH_RESTAURANT, SearchRestaurantFromAPI);
}