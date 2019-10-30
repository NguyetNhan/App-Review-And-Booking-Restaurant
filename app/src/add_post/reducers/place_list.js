import {
        FETCH_PLACE_LIST_HAS_ARRIVED_FAILED,
        FETCH_PLACE_LIST_HAS_ARRIVED_SUCCEEDED,
        RESET_PROPS_MESSAGE_PLACE_LIST,
        RESET_PROPS_PLACE_LIST
} from '../actions/types';

const PlaceListReducers = (state = null, action) => {
        switch (action.type) {
                case FETCH_PLACE_LIST_HAS_ARRIVED_SUCCEEDED:
                        return {
                                fetchPlaceListSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_PLACE_LIST_HAS_ARRIVED_FAILED:
                        return {
                                fetchPlaceListFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_PLACE_LIST:
                        return {
                                resetProps: {
                                        placeList: [],
                                        isLoading: false,
                                        message: undefined
                                }
                        };
                case RESET_PROPS_MESSAGE_PLACE_LIST:
                        return {
                                resetPropsMessage: {
                                        message: undefined
                                }
                        };
                default:
                        return state;
        }
};

export default PlaceListReducers;