import {
        CONFIRM_ORDER_FOR_ADMIN_RESTAURANT_FAILED,
        CONFIRM_ORDER_FOR_ADMIN_RESTAURANT_SUCCEEDED,
        RESET_PROPS_SCAN_QR
} from '../actions/types';

const ScanQrOrderReducers = (state = null, action) => {
        switch (action.type) {
                case CONFIRM_ORDER_FOR_ADMIN_RESTAURANT_SUCCEEDED:
                        return {
                                confirmSucceeded: {
                                        data: action.data
                                }
                        };
                case CONFIRM_ORDER_FOR_ADMIN_RESTAURANT_FAILED:
                        return {
                                confirmFailed: {
                                        messages: action.messages
                                }
                        };
                case RESET_PROPS_SCAN_QR:
                        return {
                                ResetProps: {
                                        isLoading: false,
                                        order: undefined,
                                        messages: undefined,
                                }
                        };
                default:
                        return state;
        }
};

export default ScanQrOrderReducers;