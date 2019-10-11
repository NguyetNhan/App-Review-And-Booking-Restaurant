import {
        FETCH_LIST_MESSAGE_FAILED,
        FETCH_LIST_MESSAGE_SUCCEEDED,
        CHECK_CONVERSATION_EXIST_FAILED,
        CHECK_CONVERSATION_EXIST_SUCCEEDED,
        RESET_PROPS_MESSAGE_LIST_MESSAGE,
        RESET_PROPS_LIST_MESSAGE
} from '../actions/types';

const ListMessageReducers = (state = null, action) => {
        switch (action.type) {
                /*    case CHECK_CONVERSATION_EXIST_SUCCEEDED:
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
                           }; */
                case FETCH_LIST_MESSAGE_SUCCEEDED:
                        return {
                                fetchSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_LIST_MESSAGE_FAILED:
                        return {
                                fetchFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_LIST_MESSAGE:
                        return {
                                resetPropsListMessage: {
                                        isLoading: false,
                                        listMessage: undefined,
                                        page: undefined,
                                        total_page: undefined,
                                        //  idConversation: undefined
                                }
                        };
                case RESET_PROPS_MESSAGE_LIST_MESSAGE:
                        return {
                                resetPropsMessageListMessage: {
                                        message: undefined,
                                        isLoading: false,
                                        listMessage: undefined,
                                }
                        };
                default:
                        return state;
        }
};

export default ListMessageReducers;