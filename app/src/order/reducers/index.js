import {
        FETCH_LIST_MENU_ORDER_FAILED,
        FETCH_LIST_MENU_ORDER_SUCCEEDED,
        ADD_ORDER_FAILED,
        ADD_ORDER_SUCCEEDED,
        ON_CHANGE_PAGE,
        RESET_PROPS
} from '../actions/action_types';


const OrderReducers = (state = [], action) => {
        switch (action.type) {
                case FETCH_LIST_MENU_ORDER_SUCCEEDED:
                        return {
                                FetchMenuSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_LIST_MENU_ORDER_FAILED:
                        return {
                                FetchMenuFailed: {
                                        messages: action.messages
                                }
                        };
                case ADD_ORDER_SUCCEEDED:
                        return {
                                AddOrderSucceeded: {
                                        data: action.data
                                }
                        };
                case ADD_ORDER_FAILED:
                        return {
                                AddOrderFailed: {
                                        messages: action.messages
                                }
                        };
                case ON_CHANGE_PAGE:
                        return {
                                status: action.status
                        };
                case RESET_PROPS:
                        return {
                                ResetProps: {
                                        isLoading: false,
                                        resultOrder: null
                                }
                        };
                default:
                        return state;
        }
};

export default OrderReducers;