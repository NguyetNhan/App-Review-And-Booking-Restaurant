import {
        FETCH_DETAIL_RESTAURANT_FAILED,
        FETCH_DETAIL_RESTAURANT_SUCCEEDED
} from '../actions/action_types';

const OverviewReducers = (state = [], action) => {
        switch (action.type) {
                case FETCH_DETAIL_RESTAURANT_SUCCEEDED:
                        return {
                                FetchSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_DETAIL_RESTAURANT_FAILED:
                        return {
                                FetchFailed: {
                                        message: action.message
                                }
                        };
                default:
                        return state;
        }
};

export default OverviewReducers;