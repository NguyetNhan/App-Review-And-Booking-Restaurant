import {
        RESET_PROPS_SEARCH,
        RESET_PROPS_MESSAGE_SEARCH,
        SEARCH_WITH_TYPE,
        SEARCH_WITH_TYPE_FAILED,
        SEARCH_WITH_TYPE_SUCCEEDED,
        RESET_PROPS_MESSAGE_SEARCH_MODAL, RESET_PROPS_SEARCH_MODAL,
        SEARCH_RESTAURANT_AND_CLIENT,
        SEARCH_RESTAURANT_AND_CLIENT_FAILED,
        SEARCH_RESTAURANT_AND_CLIENT_SUCCEEDED
} from './action_types';


export const onSearchRestaurantAndClient = (data) => {
        return {
                type: SEARCH_RESTAURANT_AND_CLIENT,
                data
        };
};

export const onSearchRestaurantAndClientSucceeded = (data) => {
        return {
                type: SEARCH_RESTAURANT_AND_CLIENT_SUCCEEDED,
                data
        };
};

export const onSearchRestaurantAndClientFailed = (message) => {
        return {
                type: SEARCH_RESTAURANT_AND_CLIENT_FAILED,
                message
        };
};

export const onResetProps = () => {
        return {
                type: RESET_PROPS_SEARCH,
        };
};
export const onResetPropsMessage = () => {
        return {
                type: RESET_PROPS_MESSAGE_SEARCH,
        };
};

export const onSearchWithType = (option, contentSearch,page) => {
        return {
                type: SEARCH_WITH_TYPE,
                option,
                 contentSearch,
                  page
        };
};

export const onSearchWithTypeSucceeded = (data) => {
        return {
                type: SEARCH_WITH_TYPE_SUCCEEDED,
                data
        };
};

export const onSearchWithTypeFailed = (message) => {
        return {
                type: SEARCH_WITH_TYPE_FAILED,
                message
        };
};

export const onResetPropsModal = () => {
        return {
                type: RESET_PROPS_SEARCH_MODAL,
        };
};
export const onResetPropsMessageModal = () => {
        return {
                type: RESET_PROPS_MESSAGE_SEARCH_MODAL,
        };
};