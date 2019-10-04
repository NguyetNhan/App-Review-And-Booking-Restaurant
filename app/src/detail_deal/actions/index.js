import {
        FETCH_DETAIL_ORDER,
        FETCH_DETAIL_ORDER_FAILED,
        FETCH_DETAIL_ORDER_SUCCEEDED,
        CONFIRM_ORDER,
        CONFIRM_ORDER_FAILED,
        CONFIRM_ORDER_SUCCEEDED,
        RESET_PROPS_CONFIRM,
        RESET_PROPS_MESSAGE_CONFIRM,
        RESET_PROPS_STEP_INDICATOR
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

export const onConfirmOrder = (data) => {
        return {
                type: CONFIRM_ORDER,
                data
        };
};

export const onConfirmOrderSucceeded = (data) => {
        return {
                type: CONFIRM_ORDER_SUCCEEDED,
                data
        };
};

export const onConfirmOrderFailed = (messages) => {
        return {
                type: CONFIRM_ORDER_FAILED,
                messages
        };
};

export const onResetPropsStepIndicator = () => {
        return {
                type: RESET_PROPS_STEP_INDICATOR,
        };
};

export const onResetPropsConfirm = () => {
        return {
                type: RESET_PROPS_CONFIRM,
        };
};

export const onResetPropsMessage = () => {
        return {
                type: RESET_PROPS_MESSAGE_CONFIRM,
        };
};