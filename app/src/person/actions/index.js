import {
        FETCH_ACCOUNT_VIEW,
        FETCH_ACCOUNT_VIEW_FAILED,
        FETCH_ACCOUNT_VIEW_SUCCEEDED,
        RESET_PROPS_MESSAGE_MAIN_PERSON,
        RESET_PROPS_MAIN_PERSON,
        ADD_FRIEND,
        ADD_FRIEND_FAILED,
        ADD_FRIEND_SUCCEEDED,
        REMOVE_FRIEND,
        REMOVE_FRIEND_FAILED,
        REMOVE_FRIEND_SUCCEEDED,
        CHECK_IS_FRIEND,
        CHECK_IS_FRIEND_FAILED,
        CHECK_IS_FRIEND_SUCCEEDED,
        RESET_PROPS_HEADER_PERSON,
        RESET_PROPS_MESSAGE_HEADER_PERSON
} from './types';

export const onResetPropsHeader = () => {
        return {
                type: RESET_PROPS_HEADER_PERSON
        };
};

export const onResetPropsMessageHeader = () => {
        return {
                type: RESET_PROPS_MESSAGE_HEADER_PERSON
        };
};

export const onRemoveFriend = (idAccountClient, idAccountFriend) => {
        return {
                type: REMOVE_FRIEND,
                idAccountClient,
                idAccountFriend
        };
};

export const onRemoveFriendSucceeded = (data) => {
        return {
                type: REMOVE_FRIEND_SUCCEEDED,
                data
        };
};

export const onRemoveFriendFailed = (message) => {
        return {
                type: REMOVE_FRIEND_FAILED,
                message
        };
};

export const onAddFriend = (idAccountClient, idAccountFriend) => {
        return {
                type: ADD_FRIEND,
                idAccountClient,
                idAccountFriend
        };
};

export const onAddFriendSucceeded = (data) => {
        return {
                type: ADD_FRIEND_SUCCEEDED,
                data
        };
};

export const onAddFriendFailed = (message) => {
        return {
                type: ADD_FRIEND_FAILED,
                message
        };
};

export const onCheckIsFriend = (idAccountClient, idAccountFriend) => {
        return {
                type: CHECK_IS_FRIEND,
                idAccountClient,
                idAccountFriend
        };
};

export const onCheckIsFriendSucceeded = (data) => {
        return {
                type: CHECK_IS_FRIEND_SUCCEEDED,
                data
        };
};

export const onCheckIsFriendFailed = (message) => {
        return {
                type: CHECK_IS_FRIEND_FAILED,
                message
        };
};

export const onResetPropsMain = () => {
        return {
                type: RESET_PROPS_MAIN_PERSON
        };
};

export const onResetPropsMessageMain = () => {
        return {
                type: RESET_PROPS_MESSAGE_MAIN_PERSON
        };
};

export const onFetchAccountView = (idAccountView) => {
        return {
                type: FETCH_ACCOUNT_VIEW,
                idAccountView
        };
};

export const onFetchAccountViewSucceeded = (data) => {
        return {
                type: FETCH_ACCOUNT_VIEW_SUCCEEDED,
                data
        };
};

export const onFetchAccountViewFailed = (message) => {
        return {
                type: FETCH_ACCOUNT_VIEW_FAILED,
                message
        };
};