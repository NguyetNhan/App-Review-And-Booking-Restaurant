import { combineReducers } from 'redux';
import SuggestionsReducers from './suggestions';
import ItemPlaceReducers from './item_place';
import ModalListPlaceBestReducers from './modal_list_place_best';
import ModalListFoodBestReducers from './modal_list_food_best';
import PostReducers from './post';

const HomeReducers = combineReducers({
        SuggestionsReducers,
        ItemPlaceReducers,
        ModalListPlaceBestReducers,
        ModalListFoodBestReducers,
        PostReducers
});

export default HomeReducers;