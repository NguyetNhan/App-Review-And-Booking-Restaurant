import {
        FETCH_ACCOUNT_VIEW,
        FETCH_ACCOUNT_VIEW_FAILED,
        FETCH_ACCOUNT_VIEW_SUCCEEDED,
        RESET_PROPS_MESSAGE_MAIN_PERSON,
        RESET_PROPS_MAIN_PERSON
} from './types';

export const onResetPropsMain = () => {
        return {
                type: RESET_PROPS_MAIN_PERSON
        };
};

export const onResetPropsMessageMain = () => {
        return {
                type: RESET_PROPS_MESSAGE_MAIN_PERSON
        };
};

export const onFetchAccountView = (idAccountView) => {
        return {
                type: FETCH_ACCOUNT_VIEW,
                idAccountView
        };
};

export const onFetchAccountViewSucceeded = (data) => {
        return {
                type: FETCH_ACCOUNT_VIEW_SUCCEEDED,
                data
        };
};

export const onFetchAccountViewFailed = (message) => {
        return {
                type: FETCH_ACCOUNT_VIEW_FAILED,
                message
        };
};