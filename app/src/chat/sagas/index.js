import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
        FETCH_LIST_CONVERSATION,
        FETCH_INFO_ACCOUNT_RECEIVER_FOR_CONVERSATION,
        FETCH_NEW_MESSAGE_FOR_ITEM_MESSAGE
} from '../actions/types';
import {
        onFetchListConversationSucceeded,
        onFetchListConversationFailed,
        onFetchInfoAccountReceiverFailed,
        onFetchInfoAccountReceiverSucceeded,
        onFetchNewMessageForItemFailed,
        onFetchNewMessageForItemSucceeded
} from '../actions';
import { API } from './api';

function* fetchListConversationFromApi (action) {
        try {
                const result = yield API.fetchListConversationFromAPI(action.idAccount, action.page);
                console.log('result: ', result);
                if (result.error) {
                        yield put(onFetchListConversationFailed(result.message));
                } else {
                        yield put(onFetchListConversationSucceeded(result));
                }
        } catch (error) {
                yield put(onFetchListConversationFailed(error.message));
        }
}

export function* watchFetchListConversationFromApi () {
        yield takeLatest(FETCH_LIST_CONVERSATION, fetchListConversationFromApi);
}

function* fetchInfoAccountReceiverFromAPI (action) {
        try {
                const result = yield API.fetchInfoAccountFromAPI(action.idAccount);
                console.log('result: ', result);
                if (result.error) {
                        yield put(onFetchInfoAccountReceiverFailed(result.message));
                } else {
                        yield put(onFetchInfoAccountReceiverSucceeded(result));
                }
        } catch (error) {
                yield put(onFetchInfoAccountReceiverFailed(error.message));
        }
}

export function* watchFetchInfoAccountReceiverFromAPI () {
        yield takeEvery(FETCH_INFO_ACCOUNT_RECEIVER_FOR_CONVERSATION, fetchInfoAccountReceiverFromAPI);
}

function* fetchNewMessageFromAPI (action) {
        try {
                const result = yield API.fetchNewMessageFromAPI(action.idConversation);
                if (result.error) {
                        yield put(onFetchNewMessageForItemFailed(result.message));
                } else {
                        yield put(onFetchNewMessageForItemSucceeded(result.data));
                }
        } catch (error) {
                yield put(onFetchNewMessageForItemFailed(error.message));
        }
}

export function* watchFetchNewMessageFromAPIForItemConversation () {
        yield takeEvery(FETCH_NEW_MESSAGE_FOR_ITEM_MESSAGE, fetchNewMessageFromAPI);
}
