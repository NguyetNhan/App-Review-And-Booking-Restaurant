import {
        FETCH_NEARBY_LOCATION_PLACE_FOR_HOME_FAILED,
        FETCH_NEARBY_LOCATION_PLACE_FOR_HOME_SUCCEEDED,
        RESET_PROPS_MESSAGE_SUGGESTION,
        RESET_PROPS_SUGGESTION,
        FETCH_PLACE_THE_BEST_FAILED,
        FETCH_PLACE_THE_BEST_SUCCEEDED,
        FETCH_FOOD_THE_BEST_FAILED,
        FETCH_FOOD_THE_BEST_SUCCEEDED
} from '../actions/types';

const SuggestionsReducers = (state = null, action) => {
        switch (action.type) {
                case FETCH_FOOD_THE_BEST_SUCCEEDED:
                        return {
                                fetchListFoodTheBestSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_FOOD_THE_BEST_FAILED:
                        return {
                                fetchListFoodTheBestFailed: {
                                        message: action.message
                                }
                        };
                case FETCH_PLACE_THE_BEST_SUCCEEDED:
                        return {
                                fetchListPlaceTheBestSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_PLACE_THE_BEST_FAILED:
                        return {
                                fetchListPlaceTheBestFailed: {
                                        message: action.message
                                }
                        };
                case FETCH_NEARBY_LOCATION_PLACE_FOR_HOME_SUCCEEDED:
                        return {
                                fetchListPlaceSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_NEARBY_LOCATION_PLACE_FOR_HOME_FAILED:
                        return {
                                fetchListPlaceFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_SUGGESTION:
                        return {
                                resetProps: {
                                        message: undefined,
                                        isLoading: false,
                                        listPlaceByLocation: undefined,
                                        listPlaceTheBest: undefined
                                }
                        };
                case RESET_PROPS_MESSAGE_SUGGESTION:
                        return {
                                resetPropsMessage: {
                                        message: undefined
                                }
                        };

                default:
                        return state;
        }
};

export default SuggestionsReducers;