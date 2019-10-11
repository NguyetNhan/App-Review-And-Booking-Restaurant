import {
        FETCH_LIST_MENU_ORDER_FAILED,
        FETCH_LIST_MENU_ORDER_SUCCEEDED,
        ADD_ORDER_FAILED,
        ADD_ORDER_SUCCEEDED,
        ON_CHANGE_PAGE,
        RESET_PROPS_MAIN_ORDER,
        RESET_PROPS_MESSAGE_ORDER,
        RESET_PROPS_FORM_INFO_ORDER,
        RESET_PROPS_FORM_MENU_ORDER,
        RESET_PROPS_FORM_TIME_ORDER
} from '../actions/action_types';


const OrderReducers = (state = null, action) => {
        switch (action.type) {
                case FETCH_LIST_MENU_ORDER_SUCCEEDED:
                        return {
                                fetchMenuSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_LIST_MENU_ORDER_FAILED:
                        return {
                                fetchMenuFailed: {
                                        messages: action.messages
                                }
                        };
                case ADD_ORDER_SUCCEEDED:
                        return {
                                addOrderSucceeded: {
                                        messages: action.messages
                                }
                        };
                case ADD_ORDER_FAILED:
                        return {
                                addOrderFailed: {
                                        messages: action.messages
                                }
                        };
                case ON_CHANGE_PAGE:
                        return {
                                status: action.status
                        };
                case RESET_PROPS_MAIN_ORDER:
                        return {
                                resetProps: {
                                        isLoading: false,
                                        messagesSucceeded: undefined,
                                        messagesFailed: undefined,
                                        changePage: undefined,
                                }
                        };
                case RESET_PROPS_FORM_INFO_ORDER:
                        return {
                                resetPropsInfoOrder: {
                                        changePage: undefined
                                }
                        };
                case RESET_PROPS_FORM_TIME_ORDER:
                        return {
                                resetPropsFormChonLich: {
                                        changePage: undefined,
                                }
                        };
                case RESET_PROPS_FORM_MENU_ORDER:
                        return {
                                resetPropsMenu: {
                                        isLoading: false,
                                        listMenu: undefined,
                                        page: undefined,
                                        total_page: undefined,
                                        changePage: undefined
                                }
                        };
                case RESET_PROPS_MESSAGE_ORDER:
                        return {
                                resetPropsMessage: {
                                        messagesSucceeded: undefined,
                                        messagesFailed: undefined
                                }
                        };
                default:
                        return state;
        }
};

export default OrderReducers;