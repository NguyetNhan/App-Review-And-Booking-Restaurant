import {
        FETCH_INVITE_LIST,
        FETCH_INVITE_LIST_FAILED,
        FETCH_INVITE_LIST_SUCCEEDED,
        RESET_PROPS_INVITE,
        RESET_PROPS_MESSAGE_INVITE
} from './types';

export const onFetchInviteList = (idAccount) => {
        return {
                type: FETCH_INVITE_LIST,
                idAccount
        };
};

export const onFetchInviteListSucceeded = (data) => {
        return {
                type: FETCH_INVITE_LIST_SUCCEEDED,
                data
        };
};

export const onFetchInviteListFailed = (message) => {
        return {
                type: FETCH_INVITE_LIST_FAILED,
                message
        };
};

export const onResetProps = () => {
        return {
                type: RESET_PROPS_INVITE
        };
};

export const onResetPropsMessage = () => {
        return {
                type: RESET_PROPS_MESSAGE_INVITE
        };
};