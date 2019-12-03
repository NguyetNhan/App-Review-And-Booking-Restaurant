import {
        ADD_FRIEND_FAILED,
        ADD_FRIEND_SUCCEEDED,
        CHECK_IS_FRIEND_FAILED,
        CHECK_IS_FRIEND_SUCCEEDED,
        REMOVE_FRIEND_FAILED,
        REMOVE_FRIEND_SUCCEEDED,
        RESET_PROPS_HEADER_PERSON,
        RESET_PROPS_MESSAGE_HEADER_PERSON,
        CHANGE_STATUS_FRIEND
} from '../actions/types';


const HeaderReducers = (state = null, action) => {
        switch (action.type) {
                case CHECK_IS_FRIEND_SUCCEEDED:
                        return {
                                checkIsFriendSucceeded: {
                                        data: action.data
                                }
                        };
                case CHECK_IS_FRIEND_FAILED:
                        return {
                                checkIsFriendFailed: {
                                        message: action.message
                                }
                        };
                case ADD_FRIEND_SUCCEEDED:
                        return {
                                addFriendSucceeded: {
                                        data: action.data
                                }
                        };
                case ADD_FRIEND_FAILED:
                        return {
                                addFriendFailed: {
                                        message: action.message
                                }
                        };
                case REMOVE_FRIEND_FAILED:
                        return {
                                removeFriendFailed: {
                                        message: action.message
                                }
                        };
                case REMOVE_FRIEND_SUCCEEDED:
                        return {
                                removeFriendSucceeded: {
                                        data: action.data
                                }
                        };
                case RESET_PROPS_HEADER_PERSON:
                        return {
                                resetProps: {
                                        isLoading: false,
                                        message: undefined,
                                        isFriended: null
                                }
                        };
                case RESET_PROPS_MESSAGE_HEADER_PERSON:
                        return {
                                resetPropsMessage: {
                                        message: undefined
                                }
                        };
                case CHANGE_STATUS_FRIEND:
                        return {
                                changeStatusFriend: action.status
                        };
                default:
                        return state;
        }
};

export default HeaderReducers;