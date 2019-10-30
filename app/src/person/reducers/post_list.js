import {
        FETCH_POST_LIST_FOR_PERSON_FAILED,
        FETCH_POST_LIST_FOR_PERSON_SUCCEEDED,
        RESET_PROPS_MESSAGE_POST_LIST,
        RESET_PROPS_POST_LIST,
        REFRESH_POST_LIST
} from '../actions/types';


const PostListReducers = (state = null, action) => {
        switch (action.type) {
                case FETCH_POST_LIST_FOR_PERSON_SUCCEEDED:
                        return {
                                fetchPostListSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_POST_LIST_FOR_PERSON_FAILED:
                        return {
                                fetchPostListFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_POST_LIST:
                        return {
                                resetProps: {
                                        isLoading: true,
                                        message: undefined,
                                        page: 1,
                                        total_page: null,
                                        postList: []
                                }
                        };
                case RESET_PROPS_MESSAGE_POST_LIST:
                        return {
                                resetPropsMessage: {
                                        message: undefined
                                }
                        };
                case REFRESH_POST_LIST:
                        return {
                                refreshPostList: true
                        };
                default:
                        return state;
        }
};

export default PostListReducers;