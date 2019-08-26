import {
        put,
        takeLatest
} from 'redux-saga/effects';
import {
        onFetchDetailRestaurantFailed,
        onFetchDetailRestaurantSucceeded
} from '../actions';
import { API } from './API';
import { FETCH_DETAIL_RESTAURANT } from '../actions/action_types';

function* FetchDetailRestaurantFormAPI (action) {
        try {
                const results = yield API.FetchDetailRestaurant(action.data);
                if (results.error) {
                        yield put(onFetchDetailRestaurantFailed(results.message));
                } else {
                        yield put(onFetchDetailRestaurantSucceeded(results.data));
                }
        } catch (error) {
                console.log('error: ', error);
        }
}

export function* WatchFetchDetailRestaurantFormAPI () {
        yield takeLatest(FETCH_DETAIL_RESTAURANT, FetchDetailRestaurantFormAPI);
}

