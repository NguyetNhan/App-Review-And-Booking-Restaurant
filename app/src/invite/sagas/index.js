import { put, takeLatest } from 'redux-saga/effects';
import {
        onFetchInviteListFailed,
        onFetchInviteListSucceeded
} from '../actions';
import {
        FETCH_INVITE_LIST
} from '../actions/types';
import { API } from './api';

function* fetchInviteList (action) {
        try {
                const result = yield API.fetchInviteList(action.idAccount);
                if (result.error) {
                        yield put(onFetchInviteListFailed(result.message));
                } else {
                        yield put(onFetchInviteListSucceeded(result.data));
                }
        } catch (error) {
                yield put(onFetchInviteListFailed(error.message));
        }
}

export function* watchFetchInviteList () {
        yield takeLatest(FETCH_INVITE_LIST, fetchInviteList);
}
