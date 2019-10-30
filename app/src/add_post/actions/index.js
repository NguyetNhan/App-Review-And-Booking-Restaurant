import {
        FETCH_PLACE_LIST_HAS_ARRIVED,
        FETCH_PLACE_LIST_HAS_ARRIVED_FAILED,
        FETCH_PLACE_LIST_HAS_ARRIVED_SUCCEEDED,
        RESET_PROPS_MESSAGE_PLACE_LIST,
        RESET_PROPS_PLACE_LIST,
        ADD_POST,
        ADD_POST_FAILED,
        ADD_POST_SUCCEEDED,
        RESET_PROPS_MAIN,
        RESET_PROPS_MESSAGE_MAIN
} from './types';

export const onAddPost = (data) => {
        return {
                type: ADD_POST,
                data
        };
};

export const onAddPostSucceeded = (message) => {
        return {
                type: ADD_POST_SUCCEEDED,
                message
        };
};

export const onAddPostFailed = (message) => {
        return {
                type: ADD_POST_FAILED,
                message
        };
};

export const onResetPropsMain = () => {
        return {
                type: RESET_PROPS_MAIN
        };
};
export const onResetPropsMessageMain = () => {
        return {
                type: RESET_PROPS_MESSAGE_MAIN
        };
};

export const onFetchPlaceListHasArrived = (idAccount) => {
        return {
                type: FETCH_PLACE_LIST_HAS_ARRIVED,
                idAccount
        };
};

export const onFetchPlaceListHasArrivedSucceeded = (data) => {
        return {
                type: FETCH_PLACE_LIST_HAS_ARRIVED_SUCCEEDED,
                data
        };
};
export const onFetchPlaceListHasArrivedFailed = (message) => {
        return {
                type: FETCH_PLACE_LIST_HAS_ARRIVED_FAILED,
                message
        };
};

export const onResetPropsPlaceList = () => {
        return {
                type: RESET_PROPS_PLACE_LIST
        };
};
export const onResetPropsMessagePlaceList = () => {
        return {
                type: RESET_PROPS_MESSAGE_PLACE_LIST
        };
};