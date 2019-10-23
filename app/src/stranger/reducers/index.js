import {
        FETCH_STRANGER_LIST_FAILED,
        FETCH_STRANGER_LIST_SUCCEEDED,
        RESET_PROPS_MESSAGE_STRANGER,
        RESET_PROPS_STRANGER
} from '../actions/types';

const StrangerReducers = (state = null, action) => {
        switch (action.type) {
                case FETCH_STRANGER_LIST_SUCCEEDED:
                        return {
                                fetchStrangerListSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_STRANGER_LIST_FAILED:
                        return {
                                fetchStrangerListFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_STRANGER:
                        return {
                                resetProps: {
                                        strangerList: [],
                                        message: undefined,
                                        isLoading: true
                                }
                        };
                case RESET_PROPS_MESSAGE_STRANGER:
                        return {
                                resetPropsMessage: {
                                        message: undefined,
                                }
                        };
                default:
                        return state;
        }
};

export default StrangerReducers;