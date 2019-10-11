import {
        CHECK_CONVERSATION_EXIST_FAILED,
        CHECK_CONVERSATION_EXIST_SUCCEEDED,
        FETCH_INFO_ACCOUNT_RECEIVER_FOR_DETAIL_CHAT_SUCCEEDED,
        FETCH_INFO_ACCOUNT_RECEIVER_FOR_DETAIL_CHAT_FAILED,
        RESET_PROPS_MAIN,
        RESET_PROPS_MESSAGE_MAIN
} from '../actions/types';

const MainReducers = (state = null, action) => {
        switch (action.type) {
                case CHECK_CONVERSATION_EXIST_SUCCEEDED:
                        return {
                                checkSucceeded: {
                                        data: action.data
                                }
                        };
                case CHECK_CONVERSATION_EXIST_FAILED:
                        return {
                                checkFailed: {
                                        message: action.message
                                }
                        };
                case FETCH_INFO_ACCOUNT_RECEIVER_FOR_DETAIL_CHAT_SUCCEEDED:
                        return {
                                fetchInfoAccountReceiverSucceeded: {
                                        data: action.data,
                                }
                        };
                case FETCH_INFO_ACCOUNT_RECEIVER_FOR_DETAIL_CHAT_FAILED:
                        return {
                                fetchInfoAccountReceiverFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_MAIN:
                        return {
                                resetPropsMain: {
                                        idConversation: undefined,
                                        accountReceiver: undefined,
                                        isLoading: true
                                }
                        };
                case RESET_PROPS_MESSAGE_MAIN:
                        return {
                                resetPropsMessageMain: {
                                        message: undefined
                                }
                        };
                default:
                        return state;
        }
};

export default MainReducers;