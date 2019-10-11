import {
        FETCH_LIST_CONVERSATION,
        FETCH_LIST_CONVERSATION_FAILED,
        FETCH_LIST_CONVERSATION_SUCCEEDED,
        RESET_PROPS_MAIN,
        RESET_PROPS_MESSAGE_MAIN,
        RESET_PROPS_LIST_CONVERSATION,
        RESET_PROPS_MESSAGE_LIST_CONVERSATION,
        RESET_PROPS_ITEM_CONVERSATION,
        RESET_PROPS_MESSAGE_ITEM_CONVERSATION,
        FETCH_INFO_ACCOUNT_RECEIVER_FOR_CONVERSATION,
        FETCH_INFO_ACCOUNT_RECEIVER_FOR_CONVERSATION_FAILED,
        FETCH_INFO_ACCOUNT_RECEIVER_FOR_CONVERSATION_SUCCEEDED
} from './types';

export const onFetchListConversation = (idAccount, page) => {
        return {
                type: FETCH_LIST_CONVERSATION,
                idAccount,
                page
        };
};

export const onFetchListConversationSucceeded = (data) => {
        return {
                type: FETCH_LIST_CONVERSATION_SUCCEEDED,
                data,
        };
};

export const onFetchListConversationFailed = (message) => {
        return {
                type: FETCH_LIST_CONVERSATION_FAILED,
                message
        };
};

export const onFetchInfoAccountReceiver = (idAccount) => {
        return {
                type: FETCH_INFO_ACCOUNT_RECEIVER_FOR_CONVERSATION,
                idAccount,
        };
};

export const onFetchInfoAccountReceiverSucceeded = (data) => {
        return {
                type: FETCH_INFO_ACCOUNT_RECEIVER_FOR_CONVERSATION_SUCCEEDED,
                data,
        };
};

export const onFetchInfoAccountReceiverFailed = (message) => {
        return {
                type: FETCH_INFO_ACCOUNT_RECEIVER_FOR_CONVERSATION_FAILED,
                message
        };
};

export const onResetPropsMain = () => {
        return {
                type: RESET_PROPS_MAIN
        };
};

export const onResetPropsMessageMain = () => {
        return {
                type: RESET_PROPS_MESSAGE_MAIN
        };
};

export const onResetPropsListConversation = () => {
        return {
                type: RESET_PROPS_LIST_CONVERSATION
        };
};

export const onResetPropsMessageListConversation = () => {
        return {
                type: RESET_PROPS_MESSAGE_LIST_CONVERSATION
        };
};

export const onResetPropsItemConversation = () => {
        return {
                type: RESET_PROPS_ITEM_CONVERSATION
        };
};

export const onResetPropsMessageItemConversation = () => {
        return {
                type: RESET_PROPS_MESSAGE_ITEM_CONVERSATION
        };
};