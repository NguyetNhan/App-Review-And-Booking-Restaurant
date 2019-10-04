import {
        RESET_PROPS_REVIEW,
        RESET_PROPS_MESSAGE_REVIEW,
        FETCH_LIST_REVIEW_RESTAURANT_FAILED,
        FETCH_LIST_REVIEW_RESTAURANT_SUCCEEDED,
} from '../actions/types';

const ReviewReducers = (state = null, action) => {
        switch (action.type) {
                case FETCH_LIST_REVIEW_RESTAURANT_SUCCEEDED:
                        return {
                                fetchListReviewSucceeded: {
                                        data: action.data
                                }
                        };
                case FETCH_LIST_REVIEW_RESTAURANT_FAILED:
                        return {
                                fetchListReviewFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_MESSAGE_REVIEW:
                        return {
                                resetPropsMessage: {
                                        messageFailed: undefined,
                                        messageSucceeded: undefined,
                                }
                        };
                case RESET_PROPS_REVIEW:
                        return {
                                resetProps: {
                                        messageFailed: undefined,
                                        listReview: undefined,
                                        messageSucceeded: undefined,
                                        refreshing: false
                                }
                        };
                default:
                        return state;
        }
};

export default ReviewReducers;