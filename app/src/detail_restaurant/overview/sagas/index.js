import {
        put,
        takeLatest
} from 'redux-saga/effects';
import {
        onFetchDetailRestaurantFailed,
        onFetchDetailRestaurantSucceeded,
        onFetchScoreReviewFailed,
        onFetchScoreReviewSucceeded,
        onCheckFollowRestaurantFailed,
        onCheckFollowRestaurantSucceeded,
        onFollowedAndUnFollowedRestaurantFailed,
        onFollowedAndUnFollowedRestaurantSucceeded
} from '../actions';
import { API } from './API';
import {
        FETCH_DETAIL_RESTAURANT,
        FETCH_SCORE_REVIEW_FOR_OVERVIEW,
        CHECK_FOLLOW_RESTAURANT,
        FOLLOWED_AND_UN_FOLLOWED_RESTAURANT
} from '../actions/action_types';

function* fetchDetailRestaurantFormAPI (action) {
        try {
                const results = yield API.fetchDetailRestaurant(action.data);
                if (results.error) {
                        yield put(onFetchDetailRestaurantFailed(results.message));
                } else {
                        yield put(onFetchDetailRestaurantSucceeded(results.data));
                }
        } catch (error) {
                yield put(onFetchDetailRestaurantFailed(error.message));
        }
}

export function* watchFetchDetailRestaurantFormAPI () {
        yield takeLatest(FETCH_DETAIL_RESTAURANT, fetchDetailRestaurantFormAPI);
}

function* fetchScoreReviewFromAPI (action) {
        try {
                const result = yield API.fetchScoreReview(action.data);
                if (result.error) {
                        yield put(onFetchScoreReviewFailed(result.message));
                } else {
                        yield put(onFetchScoreReviewSucceeded(result.mediumScore));
                }
        } catch (error) {
                yield put(onFetchScoreReviewFailed(error.message));
        }
}

export function* watchFetchScoreReviewFromAPI () {
        yield takeLatest(FETCH_SCORE_REVIEW_FOR_OVERVIEW, fetchScoreReviewFromAPI);
}

function* changeFollowRestaurant (action) {
        try {
                const result = yield API.changeFollowRestaurant(action.idRestaurant, action.idClient);
                if (result.error) {
                        yield put(onFollowedAndUnFollowedRestaurantFailed(result.message));
                } else {
                        yield put(onFollowedAndUnFollowedRestaurantSucceeded(result.isFollowed));
                }
        } catch (error) {
                yield put(onFollowedAndUnFollowedRestaurantFailed(error.message));
        }
}

export function* watchChangeFollowRestaurant () {
        yield takeLatest(FOLLOWED_AND_UN_FOLLOWED_RESTAURANT, changeFollowRestaurant);
}

function* checkFollowRestaurantFromAPI (action) {
        try {
                const result = yield API.checkFollowedRestaurant(action.idRestaurant, action.idClient);
                if (result.error) {
                        yield put(onCheckFollowRestaurantFailed(result.message));
                } else {
                        yield put(onCheckFollowRestaurantSucceeded(result.isFollowed));
                }
        } catch (error) {
                yield put(onCheckFollowRestaurantFailed(error.message));
        }
}

export function* watchCheckFollowRestaurantFromAPI () {
        yield takeLatest(CHECK_FOLLOW_RESTAURANT, checkFollowRestaurantFromAPI);
}