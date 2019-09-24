import {
        FETCH_LIST_MENU_ORDER,
        FETCH_LIST_MENU_ORDER_FAILED,
        FETCH_LIST_MENU_ORDER_SUCCEEDED,
        ADD_ORDER,
        ADD_ORDER_FAILED,
        ADD_ORDER_SUCCEEDED,
        ON_CHANGE_PAGE,
        RESET_PROPS
} from './action_types';

export const onFetchListMenu = (data) => {
        return {
                type: FETCH_LIST_MENU_ORDER,
                data
        };
};

export const onFetchListMenuSucceeded = (data) => {
        return {
                type: FETCH_LIST_MENU_ORDER_SUCCEEDED,
                data
        };
};

export const onFetchListMenuFailed = (messages) => {
        return {
                type: FETCH_LIST_MENU_ORDER_FAILED,
                messages
        };
};

export const onAddOrder = (data) => {
        return {
                type: ADD_ORDER,
                data
        };
};

export const onAddOrderSucceeded = (data) => {
        return {
                type: ADD_ORDER_SUCCEEDED,
                data
        };
};

export const onAddOrderFailed = (messages) => {
        return {
                type: ADD_ORDER_FAILED,
                messages
        };
};

export const onChangePage = (status) => {
        return {
                type: ON_CHANGE_PAGE,
                status
        };
};

export const onResetProps = () => {
        return {
                type: RESET_PROPS,
        };
};