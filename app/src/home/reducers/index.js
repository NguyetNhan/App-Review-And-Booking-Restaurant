import {
        FETCH_LIST_RESTAURANT_SUCCEEDED,
        FETCH_LIST_RESTAURANT_FAILED,
        FETCH_LIST_BAR_FAILED,
        FETCH_LIST_BAR_SUCCEEDED,
        FETCH_LIST_COFFEE_FAILED,
        FETCH_LIST_COFFEE_SUCCEEDED,
        FETCH_NEARBY_LOCATION_RESTAURANT_FAILED,
        FETCH_NEARBY_LOCATION_RESTAURANT_SUCCEEDED
} from '../actions/action_types';


const HomeReducers = (state = [], action) => {
        switch (action.type) {
                case FETCH_LIST_RESTAURANT_SUCCEEDED:
                        return {
                                FetchListRestaurantSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_LIST_RESTAURANT_FAILED:
                        return {
                                FetchListRestaurantFailed: {
                                        messages: action.messages
                                }
                        };
                case FETCH_LIST_BAR_SUCCEEDED:
                        return {
                                FetchListBarSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_LIST_BAR_FAILED:
                        return {
                                FetchListBarFailed: {
                                        messages: action.messages
                                }
                        };
                case FETCH_LIST_COFFEE_SUCCEEDED:
                        return {
                                FetchListCoffeeSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_LIST_COFFEE_FAILED:
                        return {
                                FetchListCoffeeFailed: {
                                        messages: action.messages
                                }
                        };
                case FETCH_NEARBY_LOCATION_RESTAURANT_SUCCEEDED:
                        return {
                                FetchListRestaurantFollowLocationSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_NEARBY_LOCATION_RESTAURANT_FAILED:
                        return {
                                FetchListRestaurantFollowLocationFailed: {
                                        messages: action.messages
                                }
                        };
                default:
                        return state;
        }
};

export default HomeReducers;