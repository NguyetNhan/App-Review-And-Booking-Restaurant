import { API } from './API';
import { put, takeLatest } from 'redux-saga/effects';
import { REGISTER_RESTAURANT } from '../actions/action_types';
import { onRegisterRestaurantResults } from '../actions';
import { DatabaseLocal } from './database_local';


function* RegisterRestaurant (action) {
        try {
                const idAccount = yield DatabaseLocal.getIdAccount();
                const results = yield API.RegisterRestaurant(action.data, idAccount);
                yield put(onRegisterRestaurantResults(results));
        } catch (error) {
                console.log('error: ', error.message);
        }
}

export function* WatchRegisterRestaurant () {
        yield takeLatest(REGISTER_RESTAURANT, RegisterRestaurant);
}