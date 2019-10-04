import {
        RESET_PROPS_REVIEW,
        FETCH_LIST_REVIEW_RESTAURANT,
        FETCH_LIST_REVIEW_RESTAURANT_FAILED,
        FETCH_LIST_REVIEW_RESTAURANT_SUCCEEDED,
        RESET_PROPS_MESSAGE_REVIEW,
} from './types';

export const onFetchListReview = (data) => {
        return {
                type: FETCH_LIST_REVIEW_RESTAURANT,
                data
        };
};
export const onFetchListReviewSucceeded = (data) => {
        return {
                type: FETCH_LIST_REVIEW_RESTAURANT_SUCCEEDED,
                data
        };
};

export const onFetchListReviewFailed = (message) => {
        return {
                type: FETCH_LIST_REVIEW_RESTAURANT_FAILED,
                message
        };
};


export const onResetProps = () => {
        return {
                type: RESET_PROPS_REVIEW,
        };
};
export const onResetPropsMessage = () => {
        return {
                type: RESET_PROPS_MESSAGE_REVIEW,
        };
};

