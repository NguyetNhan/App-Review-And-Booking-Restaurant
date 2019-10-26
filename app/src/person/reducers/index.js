import { combineReducers } from 'redux';
import MainReducers from './main';
import HeaderReducers from './header';

const PersonReducers = combineReducers({
        MainReducers,
        HeaderReducers
});

export default PersonReducers;