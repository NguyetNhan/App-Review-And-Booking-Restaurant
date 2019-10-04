import {
        SEARCH_RESTAURANT_AND_CLIENT_FAILED,
        SEARCH_RESTAURANT_AND_CLIENT_SUCCEEDED,
        RESET_PROPS_SEARCH,
        RESET_PROPS_MESSAGE_SEARCH
} from '../actions/action_types';

const MainReducers = (state = null, action) => {
        switch (action.type) {
                case SEARCH_RESTAURANT_AND_CLIENT_SUCCEEDED:
                        return {
                                searchSucceeded: {
                                        data: action.data
                                }
                        };
                case SEARCH_RESTAURANT_AND_CLIENT_FAILED:
                        return {
                                searchFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_SEARCH:
                        return {
                                resetProps: {
                                        messages: undefined,
                                        isLoading: false,
                                        listRestaurant: [],
                                        listClient: [],
                                        countItem: undefined
                                }
                        };
                case RESET_PROPS_MESSAGE_SEARCH:
                        return {
                                resetPropsMessage: {
                                        messages: undefined,
                                }
                        };
                default:
                        return state;
        }
};

export default MainReducers;