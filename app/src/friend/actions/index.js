import {
        UPDATE_FRIEND_LIST,
        UPDATE_FRIEND_LIST_FAILED,
        UPDATE_FRIEND_LIST_SUCCEEDED,
        RESET_PROPS_FRIEND,
        RESET_PROPS_MESSAGE_FRIEND,
        FETCH_FRIEND_LIST,
        FETCH_FRIEND_LIST_FAILED,
        FETCH_FRIEND_LIST_SUCCEEDED
} from './types';

export const onResetProps = () => {
        return {
                type: RESET_PROPS_FRIEND
        };
};

export const onResetPropsMessage = () => {
        return {
                type: RESET_PROPS_MESSAGE_FRIEND
        };
};


export const onFetchFriendList = (idAccount) => {
        return {
                type: FETCH_FRIEND_LIST,
                idAccount
        };
};
export const onFetchFriendListSucceeded = (data) => {
        return {
                type: FETCH_FRIEND_LIST_SUCCEEDED,
                data
        };
};
export const onFetchFriendListFailed = (message) => {
        return {
                type: FETCH_FRIEND_LIST_FAILED,
                message
        };
};

export const onUpdateFriendList = (idAccount, phoneList) => {
        return {
                type: UPDATE_FRIEND_LIST,
                idAccount,
                phoneList
        };
};

export const onUpdateFriendListSucceeded = (data) => {
        return {
                type: UPDATE_FRIEND_LIST_SUCCEEDED,
                data
        };
};

export const onUpdateFriendListFailed = (message) => {
        return {
                type: UPDATE_FRIEND_LIST_FAILED,
                message
        };
};