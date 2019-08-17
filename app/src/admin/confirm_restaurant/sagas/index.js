import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_LIST_CONFIRM_RESTAURANT, CONFIRM_AGREE, CONFIRM_CANCEL } from '../actions/action_types';
import { onFetchListConfirmRestaurantResults, onResultsConfirmAgree, onResultsConfirmCancel } from '../actions';
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

function* ConfirmRestaurantAgreeFromAPI (action) {
        try {
                const results = yield API.confirmRestaurantAgree(action.data);
                yield put(onResultsConfirmAgree(results));
        } catch (error) {
                console.log('error: ', error);
        }
}

export function* WatchConfirmRestaurantAgreeFromAPI () {
        yield takeLatest(CONFIRM_AGREE, ConfirmRestaurantAgreeFromAPI);
}

function* ConfirmRestaurantCancelFromAPI (action) {
        try {
                const results = yield API.confirmRestaurantCancel(action.data);
                yield put(onResultsConfirmCancel(results));
        } catch (error) {
                console.log('error: ', error);
        }
}

export function* WatchConfirmRestaurantCancelFromAPI () {
        yield takeLatest(CONFIRM_CANCEL, ConfirmRestaurantCancelFromAPI);
}