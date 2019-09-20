import {
        FETCH_DETAIL_ORDER_FAILED,
        FETCH_DETAIL_ORDER_SUCCEEDED
} from '../actions/types';

const StepIndicator = (state = null, action) => {
        switch (action.type) {
                case FETCH_DETAIL_ORDER_SUCCEEDED:
                        return {
                                FetchSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_DETAIL_ORDER_FAILED:
                        return {
                                FetchFailed: {
                                        messages: action.messages
                                }
                        };
                default:
                        return state;
        }
};

export default StepIndicator;