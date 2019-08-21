import { all } from 'redux-saga/effects';
import { WatchLogin, WatchAddAccount } from '../login/sagas';
import { WatchSignup } from '../sign_up/sagas';
import { WatchRegisterRestaurant } from '../client/register_restaurant/sagas';
import { WatchFetchListConfirmRestaurantFromAPI, WatchConfirmRestaurantAgreeFromAPI, WatchConfirmRestaurantCancelFromAPI } from '../admin/confirm_restaurant/sagas';
import { WatchFetchListRestaurantFromAPI } from '../home/sagas';

export default function* RootSaga () {
        yield all([
                WatchLogin(),
                WatchAddAccount(),
                WatchSignup(),
                WatchRegisterRestaurant(),
                WatchFetchListConfirmRestaurantFromAPI(),
                WatchConfirmRestaurantAgreeFromAPI(),
                WatchConfirmRestaurantCancelFromAPI(),
                WatchFetchListRestaurantFromAPI()
        ]);
}