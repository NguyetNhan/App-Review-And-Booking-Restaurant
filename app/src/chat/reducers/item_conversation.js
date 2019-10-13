import {
        FETCH_INFO_ACCOUNT_RECEIVER_FOR_CONVERSATION_FAILED,
        FETCH_INFO_ACCOUNT_RECEIVER_FOR_CONVERSATION_SUCCEEDED,
        RESET_PROPS_ITEM_CONVERSATION,
        RESET_PROPS_MESSAGE_ITEM_CONVERSATION,
        FETCH_NEW_MESSAGE_FOR_ITEM_MESSAGE_FAILED,
        FETCH_NEW_MESSAGE_FOR_ITEM_MESSAGE_SUCCEEDED
} from '../actions/types';

const ItemConversationReducers = (state = null, action) => {
        switch (action.type) {
                case FETCH_NEW_MESSAGE_FOR_ITEM_MESSAGE_SUCCEEDED:
                        return {
                                fetchNewMessageSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_NEW_MESSAGE_FOR_ITEM_MESSAGE_FAILED:
                        return {
                                fetchNewMessageFailed: {
                                        message: action.message
                                }
                        };
                case FETCH_INFO_ACCOUNT_RECEIVER_FOR_CONVERSATION_SUCCEEDED:
                        return {
                                fetchInfoAccountReceiverSucceeded: {
                                        data: action.data,
                                }
                        };
                case FETCH_INFO_ACCOUNT_RECEIVER_FOR_CONVERSATION_FAILED:
                        return {
                                fetchInfoAccountReceiverFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_ITEM_CONVERSATION:
                        return {
                                resetPropsItemConversation: {
                                        isLoading: true,
                                        accountReceiver: undefined,
                                        tinNhanMoiNhat: undefined
                                }
                        };
                case RESET_PROPS_MESSAGE_ITEM_CONVERSATION:
                        return {
                                resetPropsMessageItemConversation: {
                                        message: undefined,
                                        isLoading: false
                                }
                        };
                default:
                        return state;
        }
};

export default ItemConversationReducers;