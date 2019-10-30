import { combineReducers } from 'redux';
import PlaceListReducers from './place_list';
import MainReducers from './main';

const AddPostReducers = combineReducers({
        PlaceListReducers,
        MainReducers
});

export default AddPostReducers;