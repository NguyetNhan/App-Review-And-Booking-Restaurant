import {
        LOGIN,
        LOGIN_RESULTS,
        ADD_ACCOUNT_INTO_LOCAL,
        ADD_ACCOUNT_INTO_LOCAL_RESULTS,
        RESET_PROPS
} from './action_types';

export const onLogin = (data) => {
        return {
                type: LOGIN,
                data
        };
};

export const onLoginResults = (data) => {
        return {
                type: LOGIN_RESULTS,
                data
        };
};

export const onAddAccountIntoLocal = (data) => {
        return {
                type: ADD_ACCOUNT_INTO_LOCAL,
                data
        };
};

export const onAddAccountIntoLocalResults = (data) => {
        return {
                type: ADD_ACCOUNT_INTO_LOCAL_RESULTS,
                data
        };
};

export const onResetProps = () => {
        return {
                type: RESET_PROPS,
        };
};
