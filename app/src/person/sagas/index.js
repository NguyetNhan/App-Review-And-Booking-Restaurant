import { put, takeLatest } from 'redux-saga/effects';
import {
        FETCH_ACCOUNT_VIEW,
        CHECK_IS_FRIEND,
        ADD_FRIEND,
        REMOVE_FRIEND
} from '../actions/types';
import {
        onFetchAccountViewFailed,
        onFetchAccountViewSucceeded,
        onCheckIsFriendFailed,
        onCheckIsFriendSucceeded,
        onAddFriendFailed,
        onAddFriendSucceeded,
        onRemoveFriendFailed,
        onRemoveFriendSucceeded
} from '../actions';
import { API } from './api';

function* fetchInfoAccountView (action) {
        try {
                const result = yield API.fetchInfoAccount(action.idAccountView);
                if (result.error) {
                        yield put(onFetchAccountViewFailed(result.message));
                } else {
                        yield put(onFetchAccountViewSucceeded(result.data));
                }
        } catch (error) {
                yield put(onFetchAccountViewFailed(error.message));
        }
}

export function* watchFetchInfoAccountViewFromAPIForPerson () {
        yield takeLatest(FETCH_ACCOUNT_VIEW, fetchInfoAccountView);
}

function* checkIsFriend (action) {
        try {
                const result = yield API.checkIsFriend(action.idAccountClient, action.idAccountFriend);
                if (result.error) {
                        yield put(onCheckIsFriendFailed(result.message));
                } else {
                        yield put(onCheckIsFriendSucceeded(result.data));
                }
        } catch (error) {
                yield put(onCheckIsFriendFailed(error.message));
        }
}

export function* watchCheckIsFriend () {
        yield takeLatest(CHECK_IS_FRIEND, checkIsFriend);
}

function* sendFriendRequest (action) {
        try {
                const result = yield API.sendFriendRequest(action.idAccountClient, action.idAccountFriend);
                if (result.error) {
                        yield put(onAddFriendFailed(result.message));
                } else {
                        yield put(onAddFriendSucceeded(result.data));
                }
        } catch (error) {
                yield put(onAddFriendFailed(error.message));
        }
}

export function* watchSendFriendRequest () {
        yield takeLatest(ADD_FRIEND, sendFriendRequest);
}