import {
        ADD_POST_FAILED,
        ADD_POST_SUCCEEDED,
        RESET_PROPS_MAIN,
        RESET_PROPS_MESSAGE_MAIN
} from '../actions/types';

const MainReducers = (state = null, action) => {
        switch (action.type) {
                case ADD_POST_SUCCEEDED:
                        return {
                                addPostSucceeded: {
                                        message: action.message
                                }
                        };
                case ADD_POST_FAILED:
                        return {
                                addPostFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_MAIN:
                        return {
                                resetProps: {
                                        messageSucceeded: undefined,
                                        messageFailed: undefined,
                                        isLoadingPost: false
                                }
                        };
                case RESET_PROPS_MESSAGE_MAIN:
                        return {
                                resetPropsMessage: {
                                        messageSucceeded: undefined,
                                        messageFailed: undefined,
                                }
                        };
                default:
                        return state;
        }
};

export default MainReducers;