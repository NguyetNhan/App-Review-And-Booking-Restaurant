import { all } from 'redux-saga/effects';
import { WatchLogin, WatchAddAccount } from '../login/sagas';
import { WatchSignup } from '../sign_up/sagas';
import { WatchRegisterRestaurant } from '../client/register_restaurant/sagas';
import { WatchFetchListConfirmRestaurantFromAPI, WatchConfirmRestaurantAgreeFromAPI, WatchConfirmRestaurantCancelFromAPI } from '../admin/confirm_restaurant/sagas';
import {
        WatchFetchListRestaurantFromAPI,
        WatchFetchListBarFromAPI,
        WatchFetchListCoffeeFromAPI
} from '../home/sagas';
import { WatchSearchRestaurantFromAPI } from '../search/sagas';
import { WatchFetchDetailRestaurantFormAPI } from '../detail_restaurant/overview/sagas';
import { WatchAddMenuOnAPI, WatchFetchMenuFromAPI } from '../detail_restaurant/menu/sagas';
import { WatchFetchNotificationFromAPI } from '../notification/sagas';
import { WatchFetchListMenuForOrderFromAPI } from '../order/sagas';

export default function* RootSaga () {
        yield all([
                WatchLogin(),
                WatchAddAccount(),
                WatchSignup(),
                WatchRegisterRestaurant(),
                WatchFetchListConfirmRestaurantFromAPI(),
                WatchConfirmRestaurantAgreeFromAPI(),
                WatchConfirmRestaurantCancelFromAPI(),
                WatchFetchListRestaurantFromAPI(),
                WatchSearchRestaurantFromAPI(),
                WatchFetchDetailRestaurantFormAPI(),
                WatchAddMenuOnAPI(),
                WatchFetchMenuFromAPI(),
                WatchFetchListCoffeeFromAPI(),
                WatchFetchListBarFromAPI(),
                WatchFetchNotificationFromAPI(),
                WatchFetchListMenuForOrderFromAPI()
        ]);
}