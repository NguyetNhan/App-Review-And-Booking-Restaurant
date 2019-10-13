import {
        FETCH_LIST_MESSAGE_FAILED,
        FETCH_LIST_MESSAGE_SUCCEEDED,
        RESET_PROPS_MESSAGE_LIST_MESSAGE,
        RESET_PROPS_LIST_MESSAGE,
        RECEIVER_MESSAGE_FROM_SERVER
} from '../actions/types';

const ListMessageReducers = (state = null, action) => {
        switch (action.type) {
                case RECEIVER_MESSAGE_FROM_SERVER:
                        return {
                                messageReceiver: action.messageReceiver
                        };
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
                                }
                        };
                case RESET_PROPS_MESSAGE_LIST_MESSAGE:
                        return {
                                resetPropsMessageListMessage: {
                                        message: undefined,
                                        isLoading: false,
                                }
                        };
                default:
                        return state;
        }
};

export default ListMessageReducers;