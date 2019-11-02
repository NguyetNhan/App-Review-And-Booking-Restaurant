import {
        FETCH_POST_LIST_FOR_HOME_FAILED,
        FETCH_POST_LIST_FOR_HOME_SUCCEEDED,
        RESET_PROPS_MESSAGE_POST_FOR_HOME,
        RESET_PROPS_POST_FOR_HOME
} from '../actions/types';

const PostReducers = (state = null, action) => {
        switch (action.type) {
                case FETCH_POST_LIST_FOR_HOME_SUCCEEDED:
                        return {
                                fetchPostListSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_POST_LIST_FOR_HOME_FAILED:
                        return {
                                fetchPostListFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_POST_FOR_HOME:
                        return {
                                resetProps: {
                                        postList: undefined,
                                        isLoading: true,
                                        message: undefined
                                }
                        };
                case RESET_PROPS_MESSAGE_POST_FOR_HOME:
                        return {
                                resetPropsMessage: {
                                        message: undefined
                                }
                        };
                default:
                        return state;
        }
};

export default PostReducers;