import {
        FETCH_LIST_MENU_ORDER,
        FETCH_LIST_MENU_ORDER_FAILED,
        FETCH_LIST_MENU_ORDER_SUCCEEDED
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