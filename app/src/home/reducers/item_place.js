import {
        FETCH_STAR_PLACE_FOR_ITEM_SUGGESTION_FAILED,
        FETCH_STAR_PLACE_FOR_ITEM_SUGGESTION_SUCCEEDED
} from '../actions/types';

const ItemPlaceReducers = (state = null, action) => {
        switch (action.type) {
                case FETCH_STAR_PLACE_FOR_ITEM_SUGGESTION_SUCCEEDED:
                        return {
                                fetchStarSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_STAR_PLACE_FOR_ITEM_SUGGESTION_FAILED:
                        return {
                                fetchStarFailed: {
                                        message: action.message
                                }
                        };
                default:
                        return state;
        }
};

export default ItemPlaceReducers;