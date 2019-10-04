import { API } from './API';
import { put, takeLatest } from 'redux-saga/effects';
import { REGISTER_RESTAURANT } from '../actions/action_types';
import { onRegisterRestaurantFailed, onRegisterRestaurantSucceeded } from '../actions';
import { DatabaseLocal } from './database_local';


function* RegisterRestaurant (action) {
        try {
                const idAccount = yield DatabaseLocal.getIdAccount();
                const result = yield API.RegisterRestaurant(action.data, idAccount);
                if (result.error) {
                        yield put(onRegisterRestaurantFailed(result.message));
                } else {
                        yield put(onRegisterRestaurantSucceeded(result.data, result.message));
                }
        } catch (error) {
                yield put(onRegisterRestaurantFailed(error.message));
        }
}

export function* WatchRegisterRestaurant () {
        yield takeLatest(REGISTER_RESTAURANT, RegisterRestaurant);
}