import { put, takeLatest } from 'redux-saga/effects';
import {
        onFetchNearbyLocationRestaurantFailed,
        onFetchNearbyLocationRestaurantSucceeded,
        onFetchLocationFriendFailed,
        onFetchLocationFriendSucceeded
} from '../actions';
import {
        FETCH_NEARBY_LOCATION_RESTAURANT,
        FETCH_LOCATION_FRIEND
} from '../actions/action_types';
import { API } from './API';

function* fetchNearbyLocationPlaceFromAPI (action) {
        try {
                const results = yield API.fetchNearbyLocationPlace(action.position);
                if (results.error) {
                        yield put(onFetchNearbyLocationRestaurantFailed(results.message));
                } else {
                        yield put(onFetchNearbyLocationRestaurantSucceeded(results.data));
                }
        } catch (error) {
                yield put(onFetchNearbyLocationRestaurantFailed(error.message));
        }
}

export function* watchFetchNearbyLocationPlaceFromAPIForMap () {
        yield takeLatest(FETCH_NEARBY_LOCATION_RESTAURANT, fetchNearbyLocationPlaceFromAPI);
}

function* fetchPositionFriendFromAPI (action) {
        try {
                const result = yield API.fetchPositionFriend(action.idAccount);
                if (result.error) {
                        yield put(onFetchLocationFriendFailed(result.message));
                } else {
                        yield put(onFetchLocationFriendSucceeded(result.data));
                }
        } catch (error) {
                yield put(onFetchLocationFriendFailed(error.message));
        }
}

export function* watchFetchPositionFriendFromAPI () {
        yield takeLatest(FETCH_LOCATION_FRIEND, fetchPositionFriendFromAPI);
}