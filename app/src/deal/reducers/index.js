import {
        FETCH_LIST_ORDER_FAILED,
        FETCH_LIST_ORDER_SUCCEEDED,
        RESET_PROPS
} from '../actions/action_types';

const DealReducers = (state = [], action) => {
        switch (action.type) {
                case FETCH_LIST_ORDER_SUCCEEDED:
                        return {
                                FetchSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_LIST_ORDER_FAILED:
                        return {
                                FetchFailed: {
                                        messages: action.messages
                                }
                        };
                case RESET_PROPS:
                        return {
                                ResetProps: {
                                        page: 1,
                                        total_page: null,
                                        listOrder: [],
                                        isLoading: false,
                                }
                        };
                default:
                        return state;
        }
};

export default DealReducers;