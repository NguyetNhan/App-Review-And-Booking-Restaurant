import { all } from 'redux-saga/effects';
import { WatchLogin, WatchAddAccount } from '../login/sagas';
import { WatchSignup } from '../sign_up/sagas';
import { WatchRegisterRestaurant } from '../client/register_restaurant/sagas';
import {
        WatchFetchListConfirmRestaurantFromAPI,
        WatchConfirmRestaurantAgreeFromAPI,
        WatchConfirmRestaurantCancelFromAPI
} from '../admin/confirm_restaurant/sagas';
import {
        WatchFetchListRestaurantFromAPI,
        WatchFetchListBarFromAPI,
        WatchFetchListCoffeeFromAPI,
        WatchFetchNearbyLocationRestaurantForHomeFromAPI
} from '../home/sagas';
import {
        watchSearchFollowTypeFromAPI,
        watchSearchRestaurantAndClientFromAPI
} from '../search/sagas';
import {
        watchFetchDetailRestaurantFormAPI,
        watchFetchScoreReviewFromAPI,
        watchChangeFollowRestaurant,
        watchCheckFollowRestaurantFromAPI
} from '../detail_restaurant/overview/sagas';
import { WatchAddMenuOnAPI, WatchFetchMenuFromAPI } from '../detail_restaurant/menu/sagas';
import { WatchFetchNotificationFromAPI } from '../notification/sagas';
import { WatchFetchListMenuForOrderFromAPI, WatchAddOrderIntoDatabase } from '../order/sagas';
import { WatchFetchNearbyLocationRestaurantFromAPI } from '../map/sagas';
import { WatchFetchListOrderFromAPI } from '../deal/sagas';
import {
        watchFetchDetailOrderFromAPI,
        watchConfirmOrderFromAPI
} from '../detail_deal/sagas';
import { watchConfirmOrderForAdminRestaurant } from '../admin_restaurant/scan_qr_order/sagas';
import {
        watchFetchListReviewFromAPI
} from '../detail_restaurant/review/sagas';
import {
        watchAddReviewRestaurant,
        watchUpdateReviewRestaurant,
        watchCheckHasReview,
        watchFetchDetailData
} from '../client/add_review/sagas';

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
                watchFetchDetailRestaurantFormAPI(),
                WatchAddMenuOnAPI(),
                WatchFetchMenuFromAPI(),
                WatchFetchListCoffeeFromAPI(),
                WatchFetchListBarFromAPI(),
                WatchFetchNotificationFromAPI(),
                WatchFetchListMenuForOrderFromAPI(),
                WatchFetchNearbyLocationRestaurantFromAPI(),
                WatchFetchNearbyLocationRestaurantForHomeFromAPI(),
                WatchAddOrderIntoDatabase(),
                WatchFetchListOrderFromAPI(),
                watchFetchDetailOrderFromAPI(),
                watchConfirmOrderFromAPI(),
                watchConfirmOrderForAdminRestaurant(),
                watchAddReviewRestaurant(),
                watchFetchListReviewFromAPI(),
                watchFetchScoreReviewFromAPI(),
                watchChangeFollowRestaurant(),
                watchCheckFollowRestaurantFromAPI(),
                watchUpdateReviewRestaurant(),
                watchCheckHasReview(),
                watchFetchDetailData(),
                watchSearchFollowTypeFromAPI(),
                watchSearchRestaurantAndClientFromAPI()
        ]);
}