import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
        FETCH_ACCOUNT_VIEW,
        CHECK_IS_FRIEND,
        ADD_FRIEND,
        REMOVE_FRIEND,
        FETCH_POST_LIST_FOR_PERSON,
        CHECK_HAS_LIKE_POST_FOR_PERSON,
        LIKE_POST_FOR_PERSON,
        ACCESS_PLACE_IN_POST
} from '../actions/types';
import {
        onFetchAccountViewFailed,
        onFetchAccountViewSucceeded,
        onCheckIsFriendFailed,
        onCheckIsFriendSucceeded,
        onAddFriendFailed,
        onAddFriendSucceeded,
        onRemoveFriendFailed,
        onRemoveFriendSucceeded,
        onFetchPostListFailed,
        onFetchPostListSucceeded,
        onCheckHasLikePostFailed,
        onCheckHasLikePostSucceeded
} from '../actions';
import { API } from './api';

function* accessPlaceInPost (action) {
        yield API.accessPlaceInPost(action.idPost, action.idAccountView);
}

export function* watchAccessPlaceInPost(){
        yield takeEvery(ACCESS_PLACE_IN_POST,accessPlaceInPost);
}

function* likePostForPerson (action) {
        yield API.likePost(action.idPost, action.idAccount);
}

export function* watchLikePostForPerson () {
        yield takeEvery(LIKE_POST_FOR_PERSON, likePostForPerson);
}

function* checkLikePostFromApi (action) {
        try {
                const result = yield API.checkLikePost(action.idPost, action.idAccount);
                if (result.error) {
                        yield put(onCheckHasLikePostFailed(result.message));
                } else {
                        yield put(onCheckHasLikePostSucceeded(result.data));
                }
        } catch (error) {
                yield put(onCheckHasLikePostFailed(error.message));
        }
}

export function* watchCheckLikePostFromApiForPerson () {
        yield takeEvery(CHECK_HAS_LIKE_POST_FOR_PERSON, checkLikePostFromApi);
}

function* fetchPostListFromAPI (action) {
        try {
                const result = yield API.fetchPostList(action.idAccount, action.page);
                if (result.error) {
                        yield put(onFetchPostListFailed(result.message));
                } else {
                        yield put(onFetchPostListSucceeded(result));
                }
        } catch (error) {
                yield put(onFetchPostListFailed(error.message));
        }
}

export function* watchFetchPostListFromApiForPerson () {
        yield takeLatest(FETCH_POST_LIST_FOR_PERSON, fetchPostListFromAPI);
}

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