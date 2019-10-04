import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
        ADD_REVIEW_RESTAURANT,
        UPDATE_REVIEW_RESTAURANT,
        CHECK_HAS_REVIEW,
        FETCH_DETAIL_DATA,
} from '../actions/types';
import {
        onAddReviewRestaurantFailed,
        onAddReviewRestaurantSucceeded,
        onUpdateReviewFailed,
        onUpdateReviewSucceeded,
        onCheckHasReviewFailed,
        onCheckHasReviewSucceeded,
        onFetchDetailFailed,
        onFetchDetailSucceeded,
} from '../actions';
import { API } from './API';


function* checkHasReview (action) {
        try {
                const result = yield API.checkOrderHasReview(action.idReviewReceiver, action.idAccountReview);
                console.log('checkHasReview: ', result);
                if (result) {
                        yield put(onCheckHasReviewFailed(result.message));
                } else {
                        yield put(onCheckHasReviewSucceeded(result.data, result.review, result.message));
                }
        } catch (error) {
                yield put(onCheckHasReviewFailed(error.message));
        }
}

export function* watchCheckHasReview () {
        yield takeEvery(CHECK_HAS_REVIEW, checkHasReview);
}

function* fetchDetailData (action) {
        try {
                if (action.kind === 'restaurant') {
                        let result = yield API.fetchRestaurant(action.id);
                        console.log('fetchRestaurant: ', result);
                        if (result) {
                                yield put(onFetchDetailFailed(result.message));
                        } else {
                                yield put(onFetchDetailSucceeded(result.data, result.message));
                        }
                } else {
                        let result = yield API.fetchFood(action.id);
                        console.log('fetchFood: ', result);
                        if (result) {
                                yield put(onFetchDetailFailed(result.message));
                        } else {
                                yield put(onFetchDetailSucceeded(result.data, result.message));
                        }
                }
        } catch (error) {
                yield put(onFetchDetailFailed(error.message));
        }
}

export function* watchFetchDetailData () {
        yield takeEvery(FETCH_DETAIL_DATA, fetchDetailData);
}

function* addReviewRestaurant (action) {
        try {
                const result = yield API.addReviewRestaurant(action.data);
                if (result.error) {
                        yield put(onAddReviewRestaurantFailed(result.message));
                } else {
                        yield put(onAddReviewRestaurantSucceeded(result.message));
                }
        } catch (error) {
                yield put(onAddReviewRestaurantSucceeded(error.message));
        }
}

export function* watchAddReviewRestaurant () {
        yield takeLatest(ADD_REVIEW_RESTAURANT, addReviewRestaurant);
}

function* updateReviewRestaurant (action) {
        try {
                const result = yield API.addReviewRestaurant(action.data);
                if (result.error) {
                        yield put(onUpdateReviewFailed(result.message));
                } else {
                        yield put(onUpdateReviewSucceeded(result.message));
                }
        } catch (error) {
                yield put(onUpdateReviewFailed(error.message));
        }
}

export function* watchUpdateReviewRestaurant () {
        yield takeLatest(UPDATE_REVIEW_RESTAURANT, updateReviewRestaurant);
}