import {
        FETCH_NEARBY_LOCATION_RESTAURANT_FAILED,
        FETCH_NEARBY_LOCATION_RESTAURANT_SUCCEEDED
} from '../actions/action_types';

const MapReducers = (state = [], action) => {
        switch (action.type) {
                case FETCH_NEARBY_LOCATION_RESTAURANT_SUCCEEDED:
                        return {
                                FetchSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_NEARBY_LOCATION_RESTAURANT_FAILED:
                        return {
                                FetchFailed: {
                                        messages: action.messages
                                }
                        };
                default:
                        return state;
        }
};

export default MapReducers;