import { all } from 'redux-saga/effects';
import { WatchLogin, WatchAddAccount } from '../login/sagas';
import { WatchSignup } from '../sign_up/sagas';
import { WatchRegisterRestaurant } from '../admin_restaurant/register_restaurant/sagas';
import { WatchFetchListConfirmRestaurantFromAPI } from '../admin/confirm_restaurant/sagas';

export default function* RootSaga () {
        yield all([
                WatchLogin(),
                WatchAddAccount(),
                WatchSignup(),
                WatchRegisterRestaurant(),
                WatchFetchListConfirmRestaurantFromAPI()
        ]);
}