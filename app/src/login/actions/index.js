import {
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCEEDED,
    ADD_ACCOUNT_INTO_LOCAL,
    ADD_ACCOUNT_INTO_LOCAL_FAILED,
    ADD_ACCOUNT_INTO_LOCAL_SUCCEEDED,
    RESET_PROPS_LOGIN,
    RESET_PROPS_MESSAGE_LOGIN,

} from './action_types';

export const onLogin = (data) => {
    return {
        type: LOGIN,
        data
    };
};

export const onLoginSucceeded = (data, message) => {
    return {
        type: LOGIN_SUCCEEDED,
        data,
        message
    };
};

export const onLoginFailed = (message) => {
    return {
        type: LOGIN_FAILED,
        message
    };
};

export const onAddAccountIntoLocal = (data) => {
    return {
        type: ADD_ACCOUNT_INTO_LOCAL,
        data
    };
};

export const onAddAccountIntoLocalSucceeded = (message) => {
    return {
        type: ADD_ACCOUNT_INTO_LOCAL_SUCCEEDED,
        message,
    };
};
export const onAddAccountIntoLocalFailed = (message) => {
    return {
        type: ADD_ACCOUNT_INTO_LOCAL_FAILED,
        message
    };
};

export const onResetProps = () => {
    return {
        type: RESET_PROPS_LOGIN,
    };
};

export const onResetPropsMessage = () => {
    return {
        type: RESET_PROPS_MESSAGE_LOGIN,
    };
};
