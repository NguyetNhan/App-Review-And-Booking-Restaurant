import {
        FETCH_LIST_CONVERSATION_FAILED,
        FETCH_LIST_CONVERSATION_SUCCEEDED,
        RESET_PROPS_LIST_CONVERSATION,
        RESET_PROPS_MESSAGE_LIST_CONVERSATION
} from '../actions/types';

const ListConversationReducers = (state = null, action) => {
        switch (action.type) {
                case FETCH_LIST_CONVERSATION_SUCCEEDED:
                        return {
                                fetchListConversationSucceeded: {
                                        data: action.data,
                                }
                        };
                case FETCH_LIST_CONVERSATION_FAILED:
                        return {
                                fetchListConversationFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_LIST_CONVERSATION:
                        return {
                                resetPropsListConversation: {
                                        isLoading: false,
                                        listConversation: undefined,
                                        page: undefined,
                                        total_page: undefined,
                                }
                        };
                case RESET_PROPS_MESSAGE_LIST_CONVERSATION:
                        return {
                                resetPropsMessageListConversation: {
                                        messageSucceeded: undefined,
                                        messageFailed: undefined,
                                        isLoading: false
                                }
                        };
                default:
                        return state;
        }
};

export default ListConversationReducers;