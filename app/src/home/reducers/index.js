import { FETCH_LIST_RESTAURANT_SUCCEEDED, FETCH_LIST_RESTAURANT_FAILED } from '../actions/action_types';


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
                default:
                        return state;
        }
};

export default HomeReducers;