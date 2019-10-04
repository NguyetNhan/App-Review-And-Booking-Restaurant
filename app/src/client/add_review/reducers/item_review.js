import {
        ADD_REVIEW_RESTAURANT_FAILED,
        ADD_REVIEW_RESTAURANT_SUCCEEDED,
        RESET_PROPS_MESSAGE_ADD_REVIEW,
        CHECK_HAS_REVIEW_FAILED,
        CHECK_HAS_REVIEW_SUCCEEDED,
        FETCH_DETAIL_FAILED,
        FETCH_DETAIL_SUCCEEDED
} from '../actions/types';

const ItemReviewReducers = (state = null, action) => {
        switch (action.type) {
                case ADD_REVIEW_RESTAURANT_SUCCEEDED:
                        return {
                                addReviewSucceeded: {
                                        message: action.message
                                }
                        };
                case ADD_REVIEW_RESTAURANT_FAILED:
                        return {
                                addReviewFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_MESSAGE_ADD_REVIEW:
                        return {
                                resetPropsMessage: {
                                        messageFailed: undefined,
                                        messageSucceeded: undefined,
                                }
                        };
                case FETCH_DETAIL_SUCCEEDED:
                        return {
                                fetchDetailSucceeded: {
                                        message: action.message,
                                        data: action.data
                                }
                        };
                case FETCH_DETAIL_FAILED:
                        return {
                                fetchDetailFailed: {
                                        message: action.message
                                }
                        };
                case CHECK_HAS_REVIEW_SUCCEEDED:
                        return {
                                checkReviewSucceeded: {
                                        message: action.message,
                                        data: action.data,
                                        isReviewed: action.isReviewed
                                }
                        };
                case CHECK_HAS_REVIEW_FAILED:
                        return {
                                checkReviewFailed: {
                                        message: action.message
                                }
                        };
                default:
                        return state;
        }
};

export default ItemReviewReducers;