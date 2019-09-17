import {
        FETCH_LIST_ORDER_FOR_ADMIN,
        FETCH_LIST_ORDER_FOR_ADMIN_FAILED,
        FETCH_LIST_ORDER_FOR_ADMIN_SUCCEEDED
} from './action_types';

export const onFetchListOrder = (data) => {
        return {
                type: FETCH_LIST_ORDER_FOR_ADMIN,
                data
        };
};

export const onFetchListOrderSucceeded = (data) => {
        return {
                type: FETCH_LIST_ORDER_FOR_ADMIN_SUCCEEDED,
                data
        };
};

export const onFetchListOrderFailed = (messages) => {
        return {
                type: FETCH_LIST_ORDER_FOR_ADMIN_FAILED,
                messages
        };
};