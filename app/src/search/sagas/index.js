import { put, takeLatest } from 'redux-saga/effects';
import {
        onSearchRestaurantAndClientFailed,
        onSearchRestaurantAndClientSucceeded,
        onSearchWithTypeFailed,
        onSearchWithTypeSucceeded
} from '../actions';
import {
        SEARCH_RESTAURANT_AND_CLIENT,
        SEARCH_WITH_TYPE
} from '../actions/action_types';
import { API } from './API';
function* searchRestaurantFromAPI (action) {
        try {
                const result = yield API.searchRestaurantAndClientFromAPI(action.data);
                if (result.error) {
                        yield put(onSearchRestaurantAndClientFailed(result.message));
                } else {
                        yield put(onSearchRestaurantAndClientSucceeded(result));
                }
        } catch (error) {
                yield put(onSearchRestaurantAndClientFailed(error.message));
        }
}

export function* watchSearchRestaurantAndClientFromAPI () {
        yield takeLatest(SEARCH_RESTAURANT_AND_CLIENT, searchRestaurantFromAPI);
}

function* searchWithType (action) {
        try {
                if (action.option === 'restaurant') {
                        const result = yield API.searchRestaurantFromAPI(action.contentSearch, action.page);
                        if (result.error) {
                                yield put(onSearchWithTypeFailed(result.message));
                        } else {
                                yield put(onSearchWithTypeSucceeded(result));
                        }
                } else {
                        const result = yield API.searchClientFromAPI(action.contentSearch, action.page);
                        if (result.error) {
                                yield put(onSearchWithTypeFailed(result.message));
                        } else {
                                yield put(onSearchWithTypeSucceeded(result));
                        }
                }
        } catch (error) {
                yield put(onSearchWithTypeFailed(result.message));
        }
}

export function* watchSearchFollowTypeFromAPI () {
        yield takeLatest(SEARCH_WITH_TYPE, searchWithType);
}