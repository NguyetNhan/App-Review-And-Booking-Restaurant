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
        DetailDealReducers
});

export default RootReducer;