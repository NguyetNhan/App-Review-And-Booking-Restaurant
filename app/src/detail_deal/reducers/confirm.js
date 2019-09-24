import {
        CONFIRM_ORDER_FAILED,
        CONFIRM_ORDER_SUCCEEDED,
        RESET_PROPS_CONFIRM
} from '../actions/types';

const ConfirmReducers = (state = null, action) => {
        switch (action.type) {
                case CONFIRM_ORDER_SUCCEEDED:
                        return {
                                confirmSucceeded: {
                                        data: action.data
                                }
                        };
                case CONFIRM_ORDER_FAILED:
                        return {
                                confirmFailed: {
                                        messages: action.messages
                                }
                        };
                case RESET_PROPS_CONFIRM:
                        return {
                                ResetProps: {
                                        isLoading: false,
                                        messageConfirmSucceeded: undefined,
                                        message: undefined
                                }
                        };
                default:
                        return state;
        }
};

export default ConfirmReducers;