import { put, takeLatest } from 'redux-saga/effects';
import {
        FETCH_LIST_RESTAURANT,
        FETCH_LIST_BAR,
        FETCH_LIST_COFFEE,
        FETCH_NEARBY_LOCATION_RESTAURANT_FOR_HOME
} from '../actions/action_types';
import {
        onFetchListRestaurantFailed,
        onFetchListRestaurantSucceeded,
        onFetchListBarFailed,
        onFetchListBarSucceeded,
        onFetchListCoffeeFailed,
        onFetchListCoffeeSucceeded,
        onFetchNearbyLocationRestaurantFailed,
        onFetchNearbyLocationRestaurantSucceeded
} from '../actions';
import { API } from './API';
import { API as MapAPI } from '../../map/sagas/API';

function* FetchListRestaurantFromAPI (action) {
        try {
                const results = yield API.fetchListRestaurantFormAPI(action.data);
                if (results.error) {
                        yield put(onFetchListRestaurantFailed(results.message));
                } else {
                        yield put(onFetchListRestaurantSucceeded(results));
                }
        } catch (error) {
                yield put(onFetchListRestaurantFailed(error.message));
        }
}

export function* WatchFetchListRestaurantFromAPI () {
        yield takeLatest(FETCH_LIST_RESTAURANT, FetchListRestaurantFromAPI);
}

function* FetchListCoffeeFromAPI (action) {
        try {
                const results = yield API.fetchListCoffeeFormAPI(action.data);
                if (results.error) {
                        yield put(onFetchListCoffeeFailed(results.message));
                } else {
                        yield put(onFetchListCoffeeSucceeded(results));
                }
        } catch (error) {
                yield put(onFetchListCoffeeFailed(error.message));
        }
}

export function* WatchFetchListCoffeeFromAPI () {
        yield takeLatest(FETCH_LIST_COFFEE, FetchListCoffeeFromAPI);
}

function* FetchListBarFromAPI (action) {
        try {
                const results = yield API.fetchListBarFormAPI(action.data);
                if (results.error) {
                        yield put(onFetchListBarFailed(results.message));
                } else {
                        yield put(onFetchListBarSucceeded(results));
                }
        } catch (error) {
                yield put(onFetchListBarFailed(error.message));
        }
}

export function* WatchFetchListBarFromAPI () {
        yield takeLatest(FETCH_LIST_BAR, FetchListBarFromAPI);
}

function* FetchNearbyLocationRestaurantFromAPI (action) {
        try {
                const results = yield MapAPI.FetchNearbyLocationRestaurant(action.position);
                if (results.error) {
                        yield put(onFetchNearbyLocationRestaurantFailed(results.messages));
                } else {
                        yield put(onFetchNearbyLocationRestaurantSucceeded(results.data));
                }
        } catch (error) {
                yield put(onFetchNearbyLocationRestaurantFailed(error.message));
        }
}

export function* WatchFetchNearbyLocationRestaurantForHomeFromAPI () {
        yield takeLatest(FETCH_NEARBY_LOCATION_RESTAURANT_FOR_HOME, FetchNearbyLocationRestaurantFromAPI);
}