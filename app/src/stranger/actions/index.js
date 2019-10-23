import {
        FETCH_STRANGER_LIST,
        FETCH_STRANGER_LIST_FAILED,
        FETCH_STRANGER_LIST_SUCCEEDED,
        RESET_PROPS_MESSAGE_STRANGER,
        RESET_PROPS_STRANGER
} from './types';

export const onResetMessageProps = () => {
        return {
                type: RESET_PROPS_MESSAGE_STRANGER
        };
};

export const onResetProps = () => {
        return {
                type: RESET_PROPS_STRANGER
        };
};

export const onFetchStrangerList = (idAccount, geolocation) => {
        return {
                type: FETCH_STRANGER_LIST,
                idAccount,
                geolocation
        };
};
export const onFetchStrangerListSucceeded = (data) => {
        return {
                type: FETCH_STRANGER_LIST_SUCCEEDED,
                data
        };
};
export const onFetchStrangerListFailed = (message) => {
        return {
                type: FETCH_STRANGER_LIST_FAILED,
                message
        };
};