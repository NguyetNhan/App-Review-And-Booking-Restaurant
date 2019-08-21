import { combineReducers } from 'redux';
import LoginReducers from '../login/reducers';
import SignupReducers from '../sign_up/reducers';
import RegisterRestaurantReducers from '../client/register_restaurant/reducers';
import AdminConfirmRestaurantReducers from '../admin/confirm_restaurant/reducers';
import HomeReducers from '../home/reducers';


const RootReducer = combineReducers({
        LoginReducers,
        SignupReducers,
        RegisterRestaurantReducers,
        AdminConfirmRestaurantReducers,
        HomeReducers
});

export default RootReducer;