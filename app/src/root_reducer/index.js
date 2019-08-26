import { combineReducers } from 'redux';
import LoginReducers from '../login/reducers';
import SignupReducers from '../sign_up/reducers';
import RegisterRestaurantReducers from '../client/register_restaurant/reducers';
import AdminConfirmRestaurantReducers from '../admin/confirm_restaurant/reducers';
import HomeReducers from '../home/reducers';
import SearchReducers from '../search/reducers';
import OverviewReducers from '../detail_restaurant/overview/reducers';

const RootReducer = combineReducers({
        LoginReducers,
        SignupReducers,
        RegisterRestaurantReducers,
        AdminConfirmRestaurantReducers,
        HomeReducers,
        SearchReducers,
        OverviewReducers
});

export default RootReducer;