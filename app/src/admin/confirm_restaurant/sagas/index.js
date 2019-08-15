import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_LIST_CONFIRM_RESTAURANT } from '../actions/action_types';
import { onFetchListConfirmRestaurantResults } from '../actions';
import { API } from './API';

function* FetchListConfirmRestaurantFromAPI () {
        try {
                const results = yield API.fetchListConfirmRestaurant();
                yield put(onFetchListConfirmRestaurantResults(results));
        } catch (error) {
                console.log('error: ', error);
        }
}

export function* WatchFetchListConfirmRestaurantFromAPI () {
        yield takeLatest(FETCH_LIST_CONFIRM_RESTAURANT, FetchListConfirmRestaurantFromAPI);
}