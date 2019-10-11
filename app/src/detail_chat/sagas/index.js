import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
        FETCH_LIST_MESSAGE,
        CHECK_CONVERSATION_EXIST,
        FETCH_INFO_ACCOUNT_RECEIVER_FOR_DETAIL_CHAT,
        SEND_MESSAGE
} from '../actions/types';
import {
        onCheckConversationExistFailed,
        onCheckConversationExistSucceeded,
        onFetchListMessageFailed,
        onFetchListMessageSucceeded,
        onFetchInfoAccountReceiverFailed,
        onFetchInfoAccountReceiverSucceeded
} from '../actions';
import { API } from './api';
import { API as ApiFromChat } from '../../chat/sagas/api';


function* checkConversationExist (action) {
        try {
                const result = yield API.checkConversationExist(action.idSend, action.idReceiver);
                if (result.error) {
                        yield put(onCheckConversationExistFailed(result.message));
                } else {
                        yield put(onCheckConversationExistSucceeded(result.data));
                }
        } catch (error) {
                yield put(onCheckConversationExistFailed(error.message));
        }
}

export function* watchCheckConversationExist () {
        yield takeLatest(CHECK_CONVERSATION_EXIST, checkConversationExist);
}

function* fetchListMessageFromAPI (action) {
        try {
                const result = yield API.fetchListMessage(action.idConversation, action.page);
                if (result.error) {
                        yield put(onFetchListMessageFailed(result.message));
                } else {
                        yield put(onFetchListMessageSucceeded(result));
                }
        } catch (error) {
                yield put(onFetchListMessageFailed(error.message));
        }
}

export function* watchFetchListMessageFromAPI () {
        yield takeLatest(FETCH_LIST_MESSAGE, fetchListMessageFromAPI);
}

function* fetchInfoAccountReceiverFromAPI (action) {
        try {
                const result = yield ApiFromChat.fetchInfoAccountFromAPI(action.idAccount);
                if (result.error) {
                        yield put(onFetchInfoAccountReceiverFailed(result.message));
                } else {
                        yield put(onFetchInfoAccountReceiverSucceeded(result));
                }
        } catch (error) {
                yield put(onFetchInfoAccountReceiverFailed(error.message));
        }
}

export function* watchFetchInfoAccountReceiverForDetaiChatFromAPI () {
        yield takeLatest(FETCH_INFO_ACCOUNT_RECEIVER_FOR_DETAIL_CHAT, fetchInfoAccountReceiverFromAPI);
}

function* sendMessage (action) {
        yield API.sendMessage(action.idConversation, action.idSender, action.content);
}

export function* watchSendMessage () {
        yield takeEvery(SEND_MESSAGE, sendMessage);
}

