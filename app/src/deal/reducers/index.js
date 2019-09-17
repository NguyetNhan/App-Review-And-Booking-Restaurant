import {
        FETCH_LIST_ORDER_FOR_ADMIN_FAILED,
        FETCH_LIST_ORDER_FOR_ADMIN_SUCCEEDED
} from '../actions/action_types';

const DealReducers = (state = [], action) => {
        switch (action.type) {
                case FETCH_LIST_ORDER_FOR_ADMIN_SUCCEEDED:
                        return {
                                FetchSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_LIST_ORDER_FOR_ADMIN_FAILED:
                        return {
                                FetchFailed: {
                                        messages: action.messages
                                }
                        };

                default:
                        return state;
        }
};

export default DealReducers;