import { put, takeLatest } from 'redux-saga/effects';
import { onFetchNearbyLocationRestaurantFailed, onFetchNearbyLocationRestaurantSucceeded } from '../actions';
import { FETCH_NEARBY_LOCATION_RESTAURANT } from '../actions/action_types';
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