import { put, takeLatest } from 'redux-saga/effects';
import {
        FETCH_PLACE_LIST_HAS_ARRIVED,
        ADD_POST
} from '../actions/types';
import {
        onFetchPlaceListHasArrivedFailed,
        onFetchPlaceListHasArrivedSucceeded,
        onAddPostFailed,
        onAddPostSucceeded
} from '../actions';
import { API } from './api';

function* fetchPlaceListFromAPI (action) {
        try {
                const result = yield API.fetchPlaceList(action.idAccount);
                if (result.error) {
                        yield put(onFetchPlaceListHasArrivedFailed(result.message));
                } else {
                        yield put(onFetchPlaceListHasArrivedSucceeded(result.data));
                }
        } catch (error) {
                yield put(onFetchPlaceListHasArrivedFailed(error.message));
        }
}

export function* watchFetchPlaceListFromAPIForAddPost () {
        yield takeLatest(FETCH_PLACE_LIST_HAS_ARRIVED, fetchPlaceListFromAPI);
}

function* addPost (action) {
        try {
                const result = yield API.addPost(action.data);
                if (result.error) {
                        yield put(onAddPostFailed(result.message));
                } else {
                        yield put(onAddPostSucceeded(result.message));
                }
        } catch (error) {
                yield put(onAddPostFailed(error.message));
        }
}

export function* watchAddPost () {
        yield takeLatest(ADD_POST, addPost);
}