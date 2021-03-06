import {
        FETCH_DETAIL_ORDER_FAILED,
        FETCH_DETAIL_ORDER_SUCCEEDED,
        RESET_PROPS_STEP_INDICATOR
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
                case RESET_PROPS_STEP_INDICATOR:
                        return {
                                ResetProps: {
                                        isLoading: false,
                                        detailOrder: null,
                                }
                        };
                default:
                        return state;
        }
};

export default StepIndicator;