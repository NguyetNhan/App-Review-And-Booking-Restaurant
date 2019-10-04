import { put, takeLatest } from 'redux-saga/effects';
import {
        onFetchListReviewFailed,
        onFetchListReviewSucceeded
} from '../actions';
import {
        FETCH_LIST_REVIEW_RESTAURANT
} from '../actions/types';
import { API } from './API';

function* fetchListReviewFromAPI (action) {
        try {
                const result = yield API.fetchListReview(action.data);
                if (result.error) {
                        yield put(onFetchListReviewFailed(result.message));
                } else {
                        yield put(onFetchListReviewSucceeded(result));
                }
        } catch (error) {
                yield put(onFetchListReviewFailed(error.message));
        }
}

export function* watchFetchListReviewFromAPI () {
        yield takeLatest(FETCH_LIST_REVIEW_RESTAURANT, fetchListReviewFromAPI);
}

