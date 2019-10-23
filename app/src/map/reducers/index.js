import {
        FETCH_NEARBY_LOCATION_RESTAURANT_FAILED,
        FETCH_NEARBY_LOCATION_RESTAURANT_SUCCEEDED,
        FETCH_LOCATION_FRIEND_FAILED,
        FETCH_LOCATION_FRIEND_SUCCEEDED,
        RESET_PROPS_MAP,
        RESET_PROPS_MESSAGE_MAP
} from '../actions/action_types';

const MapReducers = (state = null, action) => {
        switch (action.type) {
                case RESET_PROPS_MAP:
                        return {
                                resetProps: {
                                        isLoading: false,
                                        markerList: undefined,
                                        message: undefined
                                }
                        };
                case RESET_PROPS_MESSAGE_MAP:
                        return {
                                resetPropsMessage: {
                                        message: undefined
                                }
                        };
                case FETCH_NEARBY_LOCATION_RESTAURANT_SUCCEEDED:
                        return {
                                fetchPlaceSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_NEARBY_LOCATION_RESTAURANT_FAILED:
                        return {
                                fetchPlaceFailed: {
                                        messages: action.messages
                                }
                        };
                case FETCH_LOCATION_FRIEND_SUCCEEDED:
                        return {
                                fetchFriendSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_LOCATION_FRIEND_FAILED:
                        return {
                                fetchFriendFailed: {
                                        messages: action.messages
                                }
                        };

                default:
                        return state;
        }
};

export default MapReducers;