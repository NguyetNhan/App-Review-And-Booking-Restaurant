import { combineReducers } from 'redux';
import MainReducers from './main';
import ModalListSearchReducers from './modal_list_search';


const SearchReducers = combineReducers({
        MainReducers,
        ModalListSearchReducers
});

export default SearchReducers;