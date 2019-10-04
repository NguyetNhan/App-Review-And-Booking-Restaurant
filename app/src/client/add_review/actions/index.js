import {
        ADD_REVIEW_RESTAURANT,
        ADD_REVIEW_RESTAURANT_FAILED,
        ADD_REVIEW_RESTAURANT_SUCCEEDED,
        RESET_PROPS_MESSAGE_ADD_REVIEW,
        CHECK_HAS_REVIEW,
        CHECK_HAS_REVIEW_FAILED,
        CHECK_HAS_REVIEW_SUCCEEDED,
        UPDATE_REVIEW_RESTAURANT, UPDATE_REVIEW_RESTAURANT_FAILED,
        UPDATE_REVIEW_RESTAURANT_SUCCEEDED,
        FETCH_DETAIL_DATA,
        FETCH_DETAIL_FAILED,
        FETCH_DETAIL_SUCCEEDED,
} from './types';


export const onAddReviewRestaurant = (data) => {
        return {
                type: ADD_REVIEW_RESTAURANT,
                data
        };
};

export const onAddReviewRestaurantSucceeded = (message) => {
        return {
                type: ADD_REVIEW_RESTAURANT_SUCCEEDED,
                message
        };
};

export const onAddReviewRestaurantFailed = (message) => {
        return {
                type: ADD_REVIEW_RESTAURANT_FAILED,
                message
        };
};
export const onResetPropsMessage = () => {
        return {
                type: RESET_PROPS_MESSAGE_ADD_REVIEW,
        };
};

export const onCheckHasReview = (idReviewReceiver, idAccountReview) => {
        return {
                type: CHECK_HAS_REVIEW,
                idReviewReceiver,
                idAccountReview
        };
};

export const onCheckHasReviewSucceeded = (data, isReviewed, message) => {
        return {
                type: CHECK_HAS_REVIEW_SUCCEEDED,
                data,
                isReviewed,
                message
        };
};

export const onCheckHasReviewFailed = (message) => {
        return {
                type: CHECK_HAS_REVIEW_FAILED,
                message
        };
};

export const onUpdateReview = (data) => {
        return {
                type: UPDATE_REVIEW_RESTAURANT,
                data
        };
};

export const onUpdateReviewSucceeded = (data, message) => {
        return {
                type: UPDATE_REVIEW_RESTAURANT_SUCCEEDED,
                data,
                message
        };
};

export const onUpdateReviewFailed = (message) => {
        return {
                type: UPDATE_REVIEW_RESTAURANT_FAILED,
                message
        };
};

export const onFetchDetailData = (kind, id) => {
        return {
                type: FETCH_DETAIL_DATA,
                kind,
                id
        };
};


export const onFetchDetailSucceeded = (data, message) => {
        return {
                type: FETCH_DETAIL_SUCCEEDED,
                data,
                message
        };
};
export const onFetchDetailFailed = (message) => {
        return {
                type: FETCH_DETAIL_FAILED,
                message
        };
};