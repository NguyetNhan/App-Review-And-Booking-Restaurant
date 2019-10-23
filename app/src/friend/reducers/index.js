import {
        UPDATE_FRIEND_LIST_FAILED,
        UPDATE_FRIEND_LIST_SUCCEEDED,
        FETCH_FRIEND_LIST_FAILED,
        FETCH_FRIEND_LIST_SUCCEEDED,
        RESET_PROPS_FRIEND,
        RESET_PROPS_MESSAGE_FRIEND
} from '../actions/types';

const FriendReducers = (state = null, action) => {
        switch (action.type) {
                case UPDATE_FRIEND_LIST_SUCCEEDED:
                        return {
                                updateFriendSucceeded: {
                                        data: action.data
                                }
                        };
                case UPDATE_FRIEND_LIST_FAILED:
                        return {
                                updateFriendFailed: {
                                        message: action.message
                                }
                        };
                case FETCH_FRIEND_LIST_FAILED:
                        return {
                                fetchFriendListFailed: {
                                        message: action.message
                                }
                        };
                case FETCH_FRIEND_LIST_SUCCEEDED:
                        return {
                                fetchFriendListSucceeded: {
                                        data: action.data
                                }
                        };
                case RESET_PROPS_FRIEND:
                        return {
                                resetProps: {
                                        isLoading: false,
                                        friendList: undefined,
                                        message: undefined
                                }
                        };
                case RESET_PROPS_MESSAGE_FRIEND:
                        return {
                                resetPropsMessage: {
                                        message: undefined
                                }
                        };
                default:
                        return state;
        }
};

export default FriendReducers;