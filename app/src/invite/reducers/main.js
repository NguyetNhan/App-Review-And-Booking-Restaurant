import {
        FETCH_INVITE_LIST_FAILED,
        FETCH_INVITE_LIST_SUCCEEDED,
        RESET_PROPS_INVITE,
        RESET_PROPS_MESSAGE_INVITE
} from '../actions/types';

const MainReducers = (state = null, action) => {
        switch (action.type) {
                case FETCH_INVITE_LIST_SUCCEEDED:
                        return {
                                fetchInviteListSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_INVITE_LIST_FAILED:
                        return {
                                fetchInviteListFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_INVITE:
                        return {
                                resetProps: {
                                        inviteList: [],
                                        isLoading: true,
                                        message: undefined
                                }
                        };
                case RESET_PROPS_MESSAGE_INVITE:
                        return {
                                resetPropsMessage: {
                                        message: undefined
                                }
                        };
                default:
                        return state;
        }
};

export default MainReducers;