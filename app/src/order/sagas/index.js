import { put, takeLatest } from 'redux-saga/effects';
import { onFetchListMenuFailed, onFetchListMenuSucceeded, onAddOrderFailed, onAddOrderSucceeded } from '../actions';
import { FETCH_LIST_MENU_ORDER, ADD_ORDER } from '../actions/action_types';
import { API } from './API';
import { AccountModel } from '../../models/account';

function* FetchListMenuForOrderFromAPI (action) {
        try {
                const results = yield API.FetchMenuFromAPI(action.data);
                if (results.error) {
                        yield put(onFetchListMenuFailed(results.message));
                } else {
                        yield put(onFetchListMenuSucceeded(results));
                }
        } catch (error) {
                yield put(onFetchListMenuFailed(error.message));
        }
}

export function* WatchFetchListMenuForOrderFromAPI () {
        yield takeLatest(FETCH_LIST_MENU_ORDER, FetchListMenuForOrderFromAPI);
}

function* AddOrderIntoDatabase (action) {
        try {
                const results = yield API.AddOrderIntoDatabase(action.data);
                if (results.error) {
                        yield put(onAddOrderFailed(results.messages));
                } else {
                        if (results.data.discount !== null) {
                                if (results.data.discount.type === 'score') {
                                        const resultAccount = yield AccountModel.FetchInfoAccountFromDatabaseLocal();
                                        if (!resultAccount.error) {
                                                const score = resultAccount.data.score - results.data.discount.score;
                                                yield AccountModel.updateAccountInfoFromDatabaseLocal(resultAccount.data.id, score);
                                        }
                                }
                        }
                        yield put(onAddOrderSucceeded(results.messages));
                }
        } catch (error) {
                yield put(onAddOrderFailed(error.message));
        }
}

export function* WatchAddOrderIntoDatabase () {
        yield takeLatest(ADD_ORDER, AddOrderIntoDatabase);
}