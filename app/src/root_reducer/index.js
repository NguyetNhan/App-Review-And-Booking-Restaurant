import { combineReducers } from 'redux';
import LoginReducers from '../login/reducers';
import SignupReducers from '../sign_up/reducers';


const RootReducer = combineReducers({
        LoginReducers,
        SignupReducers
});

export default RootReducer;