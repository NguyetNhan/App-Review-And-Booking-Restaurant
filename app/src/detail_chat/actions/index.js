import {
        FETCH_LIST_MESSAGE,
        FETCH_LIST_MESSAGE_FAILED,
        FETCH_LIST_MESSAGE_SUCCEEDED,
        RESET_PROPS_LIST_MESSAGE,
        RESET_PROPS_MAIN,
        RESET_PROPS_MESSAGE_LIST_MESSAGE,
        RESET_PROPS_MESSAGE_MAIN,
        CHECK_CONVERSATION_EXIST,
        CHECK_CONVERSATION_EXIST_FAILED,
        CHECK_CONVERSATION_EXIST_SUCCEEDED,
        SEND_MESSAGE,
        FETCH_INFO_ACCOUNT_RECEIVER_FOR_DETAIL_CHAT,
        FETCH_INFO_ACCOUNT_RECEIVER_FOR_DETAIL_CHAT_FAILED,
        FETCH_INFO_ACCOUNT_RECEIVER_FOR_DETAIL_CHAT_SUCCEEDED
} from './types';

export const onSendMessage = (idConversation, idSender, content) => {
        return {
                type: SEND_MESSAGE,
                idConversation, idSender, content
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
export const onResetPropsListMessage = () => {
        return {
                type: RESET_PROPS_LIST_MESSAGE
        };
};
export const onResetPropsMessageListMessage = () => {
        return {
                type: RESET_PROPS_MESSAGE_LIST_MESSAGE
        };
};
export const onFetchListMessage = (idConversation, page) => {
        return {
                type: FETCH_LIST_MESSAGE,
                idConversation,
                page
        };
};
export const onFetchListMessageSucceeded = (data) => {
        return {
                type: FETCH_LIST_MESSAGE_SUCCEEDED,
                data
        };
};
export const onFetchListMessageFailed = (message) => {
        return {
                type: FETCH_LIST_MESSAGE_FAILED,
                message
        };
};

export const onCheckConversationExist = (idSend, idReceiver) => {
        return {
                type: CHECK_CONVERSATION_EXIST,
                idSend,
                idReceiver
        };
};

export const onCheckConversationExistSucceeded = (data) => {
        return {
                type: CHECK_CONVERSATION_EXIST_SUCCEEDED,
                data
        };
};

export const onCheckConversationExistFailed = (message) => {
        return {
                type: CHECK_CONVERSATION_EXIST_FAILED,
                message
        };
};

export const onFetchInfoAccountReceiver = (idAccount) => {
        return {
                type: FETCH_INFO_ACCOUNT_RECEIVER_FOR_DETAIL_CHAT,
                idAccount,
        };
};

export const onFetchInfoAccountReceiverSucceeded = (data) => {
        return {
                type: FETCH_INFO_ACCOUNT_RECEIVER_FOR_DETAIL_CHAT_SUCCEEDED,
                data,
        };
};

export const onFetchInfoAccountReceiverFailed = (message) => {
        return {
                type: FETCH_INFO_ACCOUNT_RECEIVER_FOR_DETAIL_CHAT_FAILED,
                message
        };
};