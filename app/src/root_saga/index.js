import { all } from 'redux-saga/effects';
import { watchLogin, watchAddAccount } from '../login/sagas';
import { watchSignup } from '../sign_up/sagas';
import { WatchRegisterRestaurant } from '../client/register_restaurant/sagas';
import {
        WatchFetchListConfirmRestaurantFromAPI,
        WatchConfirmRestaurantAgreeFromAPI,
        WatchConfirmRestaurantCancelFromAPI
} from '../admin/confirm_restaurant/sagas';
import {
        watchFetchNearbyLocationPlaceFromAPIForHome,
        watchFetchStarPlaceForItemSuggestionFromAPI,
        watchFetchListPlaceTheBest,
        watchFetchListPlaceTheBestModal,
        watchFetchListFoodTheBest,
        watchFetchListFoodTheBestModal
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
import {
        watchFetchNearbyLocationPlaceFromAPIForMap,
        watchFetchPositionFriendFromAPI
} from '../map/sagas';
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
import {
        watchFetchListConversationFromApi,
        watchFetchInfoAccountReceiverFromAPI,
        watchFetchNewMessageFromAPIForItemConversation
} from '../chat/sagas';
import {
        watchCheckConversationExist,
        watchFetchListMessageFromAPI,
        watchFetchInfoAccountReceiverForDetaiChatFromAPI,
        watchSendMessage
} from '../detail_chat/sagas';
import {
        watchUpdateFriendList,
        watchFetchFriendList
} from '../friend/sagas';
import {
        watchFetchStrangerListFromAPI
} from '../stranger/sagas';
import {
        watchFetchInfoAccountViewFromAPIForPerson,
        watchCheckIsFriend,
        watchSendFriendRequest
} from '../person/sagas';
import {
        watchFetchInviteList
} from '../invite/sagas';

export default function* RootSaga () {
        yield all([
                watchLogin(), watchAddAccount(),
                watchSignup(),
                WatchRegisterRestaurant(),
                WatchFetchListConfirmRestaurantFromAPI(),
                WatchConfirmRestaurantAgreeFromAPI(),
                WatchConfirmRestaurantCancelFromAPI(),
                watchFetchDetailRestaurantFormAPI(),
                WatchAddMenuOnAPI(),
                WatchFetchMenuFromAPI(),
                WatchFetchNotificationFromAPI(),
                WatchFetchListMenuForOrderFromAPI(),
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
                watchSearchRestaurantAndClientFromAPI(),
                watchFetchListConversationFromApi(),
                watchCheckConversationExist(),
                watchFetchListMessageFromAPI(),
                watchFetchInfoAccountReceiverFromAPI(),
                watchFetchInfoAccountReceiverForDetaiChatFromAPI(),
                watchSendMessage(),
                watchFetchNewMessageFromAPIForItemConversation(),
                watchFetchNearbyLocationPlaceFromAPIForHome(),
                watchFetchNearbyLocationPlaceFromAPIForMap(),
                watchFetchStarPlaceForItemSuggestionFromAPI(),
                watchFetchListPlaceTheBest(),
                watchFetchListPlaceTheBestModal(),
                watchFetchListFoodTheBest(),
                watchFetchListFoodTheBestModal(),
                watchUpdateFriendList(),
                watchFetchFriendList(),
                watchFetchPositionFriendFromAPI(),
                watchFetchStrangerListFromAPI(),
                watchFetchInfoAccountViewFromAPIForPerson(),
                watchCheckIsFriend(),
                watchSendFriendRequest(),
                watchFetchInviteList()

        ]);
}