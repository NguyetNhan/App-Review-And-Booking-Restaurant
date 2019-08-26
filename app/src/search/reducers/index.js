import { SEARCH_RESTAURANT_FAILED, SEARCH_RESTAURANT_SUCCEEDED } from '../actions/action_types';

const SearchReducers = (state = [], action) => {
        switch (action.type) {
                case SEARCH_RESTAURANT_SUCCEEDED:
                        return {
                                SearchSucceeded: {
                                        data: action.data
                                }
                        };
                case SEARCH_RESTAURANT_FAILED:
                        return {
                                SearchFailed: {
                                        data: action.data
                                }
                        };
                default:
                        return state;
        }
};

export default SearchReducers;