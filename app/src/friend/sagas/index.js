import { put, takeLatest } from 'redux-saga/effects';
import {
        UPDATE_FRIEND_LIST,
        FETCH_FRIEND_LIST
} from '../actions/types';
import {
        onUpdateFriendListFailed,
        onUpdateFriendListSucceeded,
        onFetchFriendListFailed,
        onFetchFriendListSucceeded
} from '../actions';
import { API } from './api';

function* fetchFriendList (action) {
        try {
                const result = yield API.fetchFriendList(action.idAccount);
                if (result.error) {
                        yield put(onFetchFriendListFailed(result.message));
                } else {
                        yield put(onFetchFriendListSucceeded(result.data));
                }
        } catch (error) {
                yield put(onFetchFriendListFailed(error.message));
        }
}

export function* watchFetchFriendList () {
        yield takeLatest(FETCH_FRIEND_LIST, fetchFriendList);
}

function* updateFriendList (action) {
        try {
                const result = yield API.updateFriendList(action.idAccount, action.phoneList);
                if (result.error) {
                        yield put(onUpdateFriendListFailed(result.message));
                } else {
                        yield put(onUpdateFriendListSucceeded(result.data));
                }
        } catch (error) {
                yield put(onUpdateFriendListFailed(error.message));
        }
}

export function* watchUpdateFriendList () {
        yield takeLatest(UPDATE_FRIEND_LIST, updateFriendList);
}