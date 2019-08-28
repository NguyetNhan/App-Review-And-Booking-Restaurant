import {
        ADD_MENU,
        ADD_MENU_FAILED,
        ADD_MENU_SUCCEEDED,
        FETCH_MENU,
        FETCH_MENU_FAILED,
        FETCH_MENU_SUCCEEDED
} from './action_types';

export const onAddMenu = (data) => {
        return {
                type: ADD_MENU,
                data
        };
};

export const onAddMenuSucceeded = (data) => {
        return {
                type: ADD_MENU_SUCCEEDED,
                data
        };
};

export const onAddMenuFailed = (message) => {
        return {
                type: ADD_MENU_FAILED,
                message
        };
};

export const onFetchMenu = (data) => {
        return {
                type: FETCH_MENU,
                data
        };
};

export const onFetchMenuSucceeded = (data) => {
        return {
                type: FETCH_MENU_SUCCEEDED,
                data
        };
};

export const onFetchMenuFailed = (message) => {
        return {
                type: FETCH_MENU_FAILED,
                message
        };
};

