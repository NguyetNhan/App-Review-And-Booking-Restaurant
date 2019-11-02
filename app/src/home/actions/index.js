import {
        FETCH_NEARBY_LOCATION_PLACE_FOR_HOME,
        FETCH_NEARBY_LOCATION_PLACE_FOR_HOME_FAILED,
        FETCH_NEARBY_LOCATION_PLACE_FOR_HOME_SUCCEEDED,
        RESET_PROPS_MESSAGE_SUGGESTION,
        RESET_PROPS_SUGGESTION,
        FETCH_STAR_PLACE_FOR_ITEM_SUGGESTION,
        FETCH_STAR_PLACE_FOR_ITEM_SUGGESTION_FAILED,
        FETCH_STAR_PLACE_FOR_ITEM_SUGGESTION_SUCCEEDED,
        FETCH_PLACE_THE_BEST,
        FETCH_PLACE_THE_BEST_FAILED,
        FETCH_PLACE_THE_BEST_SUCCEEDED,
        FETCH_PLACE_THE_BEST_FOR_MODAL,
        FETCH_PLACE_THE_BEST_FOR_MODAL_FAILED,
        FETCH_PLACE_THE_BEST_FOR_MODAL_SUCCEEDED,
        FETCH_FOOD_THE_BEST,
        FETCH_FOOD_THE_BEST_FAILED,
        FETCH_FOOD_THE_BEST_SUCCEEDED,
        FETCH_FOOD_THE_BEST_FOR_MODAL,
        FETCH_FOOD_THE_BEST_FOR_MODAL_FAILED,
        FETCH_FOOD_THE_BEST_FOR_MODAL_SUCCEEDED,
        FETCH_POST_LIST_FOR_HOME,
        FETCH_POST_LIST_FOR_HOME_FAILED,
        FETCH_POST_LIST_FOR_HOME_SUCCEEDED,
        RESET_PROPS_MESSAGE_POST_FOR_HOME,
        RESET_PROPS_POST_FOR_HOME
} from './types';

export const onResetPropsPost = () => {
        return {
                type: RESET_PROPS_POST_FOR_HOME,
        };
};

export const onResetPropsMessagePost = () => {
        return {
                type: RESET_PROPS_MESSAGE_POST_FOR_HOME,
        };
};

export const onFetchPostList = (page) => {
        return {
                type: FETCH_POST_LIST_FOR_HOME,
                page
        };
};

export const onFetchPostListSucceeded = (data) => {
        return {
                type: FETCH_POST_LIST_FOR_HOME_SUCCEEDED,
                data
        };
};

export const onFetchPostListFailed = (message) => {
        return {
                type: FETCH_POST_LIST_FOR_HOME_FAILED,
                message
        };
};

export const onFetchFoodTheBestForModal = (page) => {
        return {
                type: FETCH_FOOD_THE_BEST_FOR_MODAL,
                page
        };
};
export const onFetchFoodTheBestForModalSucceeded = (data) => {
        return {
                type: FETCH_FOOD_THE_BEST_FOR_MODAL_SUCCEEDED,
                data
        };
};
export const onFetchFoodTheBestForModalFailed = (message) => {
        return {
                type: FETCH_FOOD_THE_BEST_FOR_MODAL_FAILED,
                message
        };
};
export const onFetchFoodTheBest = (page) => {
        return {
                type: FETCH_FOOD_THE_BEST,
                page
        };
};
export const onFetchFoodTheBestSucceeded = (data) => {
        return {
                type: FETCH_FOOD_THE_BEST_SUCCEEDED,
                data
        };
};
export const onFetchFoodTheBestFailed = (message) => {
        return {
                type: FETCH_FOOD_THE_BEST_FAILED,
                message
        };
};
export const onFetchPlaceTheBestForModal = (page) => {
        return {
                type: FETCH_PLACE_THE_BEST_FOR_MODAL,
                page
        };
};
export const onFetchPlaceTheBestForModalSucceeded = (data) => {
        return {
                type: FETCH_PLACE_THE_BEST_FOR_MODAL_SUCCEEDED,
                data
        };
};
export const onFetchPlaceTheBestForModalFailed = (message) => {
        return {
                type: FETCH_PLACE_THE_BEST_FOR_MODAL_FAILED,
                message
        };
};

export const onFetchPlaceTheBest = (page) => {
        return {
                type: FETCH_PLACE_THE_BEST,
                page
        };
};
export const onFetchPlaceTheBestSucceeded = (data) => {
        return {
                type: FETCH_PLACE_THE_BEST_SUCCEEDED,
                data
        };
};
export const onFetchPlaceTheBestFailed = (message) => {
        return {
                type: FETCH_PLACE_THE_BEST_FAILED,
                message
        };
};

export const onFetchStarPlaceForItemSuggestion = (idPlace) => {
        return {
                type: FETCH_STAR_PLACE_FOR_ITEM_SUGGESTION,
                idPlace
        };
};

export const onFetchStarPlaceForItemSuggestionSucceeded = (data) => {
        return {
                type: FETCH_STAR_PLACE_FOR_ITEM_SUGGESTION_SUCCEEDED,
                data
        };
};
export const onFetchStarPlaceForItemSuggestionFailed = (message) => {
        return {
                type: FETCH_STAR_PLACE_FOR_ITEM_SUGGESTION_FAILED,
                message
        };
};
export const onFetchNearbyLocationPlace = (geolocation) => {
        return {
                type: FETCH_NEARBY_LOCATION_PLACE_FOR_HOME,
                geolocation
        };
};

export const onFetchNearbyLocationPlaceSucceeded = (data) => {
        return {
                type: FETCH_NEARBY_LOCATION_PLACE_FOR_HOME_SUCCEEDED,
                data
        };
};

export const onFetchNearbyLocationPlaceFailed = (messages) => {
        return {
                type: FETCH_NEARBY_LOCATION_PLACE_FOR_HOME_FAILED,
                messages
        };
};

export const onResetPropsSuggestion = () => {
        return {
                type: RESET_PROPS_SUGGESTION
        };
};

export const onResetPropsMessageSuggestion = () => {
        return {
                type: RESET_PROPS_MESSAGE_SUGGESTION
        };
};