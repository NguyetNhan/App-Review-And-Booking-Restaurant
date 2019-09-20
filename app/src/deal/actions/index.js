import {
        FETCH_LIST_ORDER,
        FETCH_LIST_ORDER_FAILED,
        FETCH_LIST_ORDER_SUCCEEDED,
        RESET_PROPS,
} from './action_types';

export const onFetchListOrder = (data) => {
        return {
                type: FETCH_LIST_ORDER,
                data,
        };
};

export const onFetchListOrderSucceeded = (data) => {
        return {
                type: FETCH_LIST_ORDER_SUCCEEDED,
                data
        };
};

export const onFetchListOrderFailed = (messages) => {
        return {
                type: FETCH_LIST_ORDER_FAILED,
                messages
        };
};


export const onResetProps = () => {
        return {
                type: RESET_PROPS,
        };
};