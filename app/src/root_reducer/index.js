import { combineReducers } from 'redux';
import LoginReducers from '../login/reducers';
import SignupReducers from '../sign_up/reducers';
import RegisterRestaurantReducers from '../client/register_restaurant/reducers';
import AdminConfirmRestaurantReducers from '../admin/confirm_restaurant/reducers';
import HomeReducers from '../home/reducers';
import SearchReducers from '../search/reducers';
import OverviewReducers from '../detail_restaurant/overview/reducers';
import MenuReducers from '../detail_restaurant/menu/reducers';
import NotificationReducers from '../notification/reducers';
import OrderReducers from '../order/reducers';
import MapReducers from '../map/reducers';
import DealReducers from '../deal/reducers';
import DetailDealReducers from '../detail_deal/reducers';
import ScanQrOrderReducers from '../admin_restaurant/scan_qr_order/reducers';
import ReviewReducers from '../detail_restaurant/review/reducers';
import AddReviewReducers from '../client/add_review/reducers/add_review_reducers';
import ChatReducers from '../chat/reducers';
import DetailChatReducers from '../detail_chat/reducers';

const RootReducer = combineReducers({
        LoginReducers,
        SignupReducers,
        RegisterRestaurantReducers,
        AdminConfirmRestaurantReducers,
        HomeReducers,
        SearchReducers,
        OverviewReducers,
        MenuReducers,
        NotificationReducers,
        OrderReducers,
        MapReducers,
        DealReducers,
        DetailDealReducers,
        ScanQrOrderReducers,
        ReviewReducers,
        AddReviewReducers,
        ChatReducers,
        DetailChatReducers
});

export default RootReducer;