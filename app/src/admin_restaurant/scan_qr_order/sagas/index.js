import { put, takeLatest } from 'redux-saga/effects';
import {
        onConfirmOrderForAdminRestaurantFailed,
        onConfirmOrderForAdminRestaurantSucceeded
} from '../actions';
import {
        CONFIRM_ORDER_FOR_ADMIN_RESTAURANT
} from '../actions/types';
import { API } from './API';

function* confirmOrderForAdminRestaurant (action) {
        try {
                const results = yield API.confirmOrder(action.data);
                if (results.error) {
                        yield put(onConfirmOrderForAdminRestaurantFailed(results.messages));
                } else {
                        yield put(onConfirmOrderForAdminRestaurantSucceeded(results));
                }
        } catch (error) {
                console.log('error: ', error);
                yield put(onConfirmOrderForAdminRestaurantFailed(error.message));
        }
}

export function* watchConfirmOrderForAdminRestaurant () {
        yield takeLatest(CONFIRM_ORDER_FOR_ADMIN_RESTAURANT, confirmOrderForAdminRestaurant);
}