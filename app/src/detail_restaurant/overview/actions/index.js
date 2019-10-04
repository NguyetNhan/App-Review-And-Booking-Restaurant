import {
        FETCH_DETAIL_RESTAURANT,
        FETCH_DETAIL_RESTAURANT_FAILED,
        FETCH_DETAIL_RESTAURANT_SUCCEEDED,
        FETCH_SCORE_REVIEW_FOR_OVERVIEW,
        FETCH_SCORE_REVIEW_FOR_OVERVIEW_FAILED,
        FETCH_SCORE_REVIEW_FOR_OVERVIEW_SUCCEEDED,
        CHECK_FOLLOW_RESTAURANT,
        CHECK_FOLLOW_RESTAURANT_FAILED,
        CHECK_FOLLOW_RESTAURANT_SUCCEEDED,
        FOLLOWED_AND_UN_FOLLOWED_RESTAURANT,
        FOLLOWED_AND_UN_FOLLOWED_RESTAURANT_FAILED,
        FOLLOWED_AND_UN_FOLLOWED_RESTAURANT_SUCCEEDED,
        RESET_PROPS_MESSAGE_OVERVIEW,
        RESET_PROPS_OVERVIEW
} from './action_types';

export const onFetchDetailRestaurant = (data) => {
        return {
                type: FETCH_DETAIL_RESTAURANT,
                data
        };
};

export const onFetchDetailRestaurantSucceeded = (data) => {
        return {
                type: FETCH_DETAIL_RESTAURANT_SUCCEEDED,
                data
        };
};

export const onFetchDetailRestaurantFailed = (message) => {
        return {
                type: FETCH_DETAIL_RESTAURANT_FAILED,
                message
        };
};

export const onFetchScoreReview = (data) => {
        return {
                type: FETCH_SCORE_REVIEW_FOR_OVERVIEW,
                data
        };
};

export const onFetchScoreReviewSucceeded = (score) => {
        return {
                type: FETCH_SCORE_REVIEW_FOR_OVERVIEW_SUCCEEDED,
                score
        };
};

export const onFetchScoreReviewFailed = (message) => {
        return {
                type: FETCH_SCORE_REVIEW_FOR_OVERVIEW_FAILED,
                message
        };
};

export const onCheckFollowRestaurant = (idRestaurant, idClient) => {
        return {
                type: CHECK_FOLLOW_RESTAURANT,
                idRestaurant,
                idClient
        };
};

export const onCheckFollowRestaurantSucceeded = (isChecked) => {
        return {
                type: CHECK_FOLLOW_RESTAURANT_SUCCEEDED,
                isChecked
        };
};


export const onCheckFollowRestaurantFailed = (message) => {
        return {
                type: CHECK_FOLLOW_RESTAURANT_FAILED,
                message
        };
};

export const onFollowedAndUnFollowedRestaurant = (idRestaurant, idClient) => {
        return {
                type: FOLLOWED_AND_UN_FOLLOWED_RESTAURANT,
                idRestaurant,
                idClient
        };
};

export const onFollowedAndUnFollowedRestaurantSucceeded = (isChecked) => {
        return {
                type: FOLLOWED_AND_UN_FOLLOWED_RESTAURANT_SUCCEEDED,
                isChecked
        };
};

export const onFollowedAndUnFollowedRestaurantFailed = (message) => {
        return {
                type: FOLLOWED_AND_UN_FOLLOWED_RESTAURANT_FAILED,
                message
        };
};

export const onResetProps = () => {
        return {
                type: RESET_PROPS_OVERVIEW,
        };
};

export const onResetPropsMessage = () => {
        return {
                type: RESET_PROPS_MESSAGE_OVERVIEW,
        };
};





