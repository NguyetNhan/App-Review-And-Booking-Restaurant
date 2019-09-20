import {
        FETCH_DETAIL_ORDER,
        FETCH_DETAIL_ORDER_FAILED,
        FETCH_DETAIL_ORDER_SUCCEEDED
} from './types';

export const onFetchDetailOrder = (idOrder) => {
        return {
                type: FETCH_DETAIL_ORDER,
                idOrder
        };
};

export const onFetchDetailOrderSucceeded = (data) => {
        return {
                type: FETCH_DETAIL_ORDER_SUCCEEDED,
                data
        };
};

export const onFetchDetailOrderFailed = (messages) => {
        return {
                type: FETCH_DETAIL_ORDER_FAILED,
                messages
        };
};