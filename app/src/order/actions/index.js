import {
        FETCH_LIST_MENU_ORDER,
        FETCH_LIST_MENU_ORDER_FAILED,
        FETCH_LIST_MENU_ORDER_SUCCEEDED,
        ADD_ORDER,
        ADD_ORDER_FAILED,
        ADD_ORDER_SUCCEEDED,
        ON_CHANGE_PAGE,
        RESET_PROPS_MESSAGE_ORDER,
        RESET_PROPS_FORM_INFO_ORDER,
        RESET_PROPS_FORM_TIME_ORDER,
        RESET_PROPS_FORM_MENU_ORDER,
        RESET_PROPS_MAIN_ORDER
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

export const onAddOrderSucceeded = (messages) => {
        return {
                type: ADD_ORDER_SUCCEEDED,
                messages
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

export const onResetPropsMain = () => {
        return {
                type: RESET_PROPS_MAIN_ORDER,
        };
};

export const onResetPropsListMenu = () => {
        return {
                type: RESET_PROPS_FORM_MENU_ORDER,
        };
};

export const onResetPropsFormChonLich = () => {
        return {
                type: RESET_PROPS_FORM_TIME_ORDER,
        };
};

export const onResetPropsFormInfoAccount = () => {
        return {
                type: RESET_PROPS_FORM_INFO_ORDER,
        };
};

export const onResetPropsMessage = () => {
        return {
                type: RESET_PROPS_MESSAGE_ORDER,
        };
};