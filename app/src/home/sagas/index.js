import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
        FETCH_NEARBY_LOCATION_PLACE_FOR_HOME,
        FETCH_STAR_PLACE_FOR_ITEM_SUGGESTION,
        FETCH_PLACE_THE_BEST,
        FETCH_PLACE_THE_BEST_FOR_MODAL,
        FETCH_FOOD_THE_BEST,
        FETCH_FOOD_THE_BEST_FOR_MODAL,
        FETCH_POST_LIST_FOR_HOME
} from '../actions/types';
import {
        onFetchNearbyLocationPlaceFailed,
        onFetchNearbyLocationPlaceSucceeded,
        onFetchStarPlaceForItemSuggestionFailed,
        onFetchStarPlaceForItemSuggestionSucceeded,
        onFetchPlaceTheBestFailed,
        onFetchPlaceTheBestSucceeded,
        onFetchPlaceTheBestForModalFailed,
        onFetchPlaceTheBestForModalSucceeded,
        onFetchFoodTheBestFailed,
        onFetchFoodTheBestSucceeded,
        onFetchFoodTheBestForModalFailed,
        onFetchFoodTheBestForModalSucceeded,
        onFetchPostListSucceeded,
        onFetchPostListFailed
} from '../actions';
import { API as mapAPI } from '../../map/sagas/API';
import { API as overviewAPI } from '../../detail_restaurant/overview/sagas/API';
import { API } from './API';

function* fetchPostListForHome (action) {
        try {
                const result = yield API.fetchPostList(action.page);
                if (result.error) {
                        yield put(onFetchPostListFailed(result.message));
                } else {
                        yield put(onFetchPostListSucceeded(result));
                }
        } catch (error) {
                yield put(onFetchPostListFailed(error.message));
        }
}

export function* watchFetchPostListForHome () {
        yield takeLatest(FETCH_POST_LIST_FOR_HOME, fetchPostListForHome);
}

function* fetchListFoodTheBestModal (action) {
        try {
                const result = yield API.fetchListFoodTheBest(action.page);
                if (result.error) {
                        yield put(onFetchFoodTheBestForModalFailed(result.message));
                } else {
                        yield put(onFetchFoodTheBestForModalSucceeded(result));
                }
        } catch (error) {
                yield put(onFetchFoodTheBestForModalFailed(error.message));
        }
}

export function* watchFetchListFoodTheBestModal () {
        yield takeLatest(FETCH_FOOD_THE_BEST_FOR_MODAL, fetchListFoodTheBestModal);
}
function* fetchListFoodTheBest (action) {
        try {
                const result = yield API.fetchListFoodTheBest(action.page);
                if (result.error) {
                        yield put(onFetchFoodTheBestFailed(result.message));
                } else {
                        yield put(onFetchFoodTheBestSucceeded(result.data));
                }
        } catch (error) {
                yield put(onFetchFoodTheBestFailed(error.message));
        }
}

export function* watchFetchListFoodTheBest () {
        yield takeLatest(FETCH_FOOD_THE_BEST, fetchListFoodTheBest);
}

function* fetchListPlaceTheBestModal (action) {
        try {
                const result = yield API.fetchListPlaceTheBest(action.page);
                if (result.error) {
                        yield put(onFetchPlaceTheBestForModalFailed(result.message));
                } else {
                        yield put(onFetchPlaceTheBestForModalSucceeded(result));
                }
        } catch (error) {
                yield put(onFetchPlaceTheBestForModalFailed(error.message));
        }
}

export function* watchFetchListPlaceTheBestModal () {
        yield takeLatest(FETCH_PLACE_THE_BEST_FOR_MODAL, fetchListPlaceTheBestModal);
}
function* fetchListPlaceTheBest (action) {
        try {
                const result = yield API.fetchListPlaceTheBest(action.page);
                if (result.error) {
                        yield put(onFetchPlaceTheBestFailed(result.message));
                } else {
                        yield put(onFetchPlaceTheBestSucceeded(result.data));
                }
        } catch (error) {
                yield put(onFetchPlaceTheBestFailed(error.message));
        }
}

export function* watchFetchListPlaceTheBest () {
        yield takeLatest(FETCH_PLACE_THE_BEST, fetchListPlaceTheBest);
}


function* fetchNearbyLocationPlaceFromAPI (action) {
        try {
                const result = yield mapAPI.fetchNearbyLocationPlace(action.geolocation);
                if (result.error) {
                        yield put(onFetchNearbyLocationPlaceFailed(result.message));
                } else {
                        yield put(onFetchNearbyLocationPlaceSucceeded(result.data));
                }
        } catch (error) {
                yield put(onFetchNearbyLocationPlaceFailed(error.message));
        }
}

export function* watchFetchNearbyLocationPlaceFromAPIForHome () {
        yield takeLatest(FETCH_NEARBY_LOCATION_PLACE_FOR_HOME, fetchNearbyLocationPlaceFromAPI);
}

function* fetchStarPlaceForItemSuggestionFromAPI (action) {
        try {
                const result = yield overviewAPI.fetchScoreReview(action.idPlace);
                if (result.error) {
                        yield put(onFetchStarPlaceForItemSuggestionFailed(result.message));
                } else {
                        yield put(onFetchStarPlaceForItemSuggestionSucceeded(result.mediumScore));
                }
        } catch (error) {
                yield put(onFetchStarPlaceForItemSuggestionFailed(error.message));
        }
}

export function* watchFetchStarPlaceForItemSuggestionFromAPI () {
        yield takeEvery(FETCH_STAR_PLACE_FOR_ITEM_SUGGESTION, fetchStarPlaceForItemSuggestionFromAPI);
}


