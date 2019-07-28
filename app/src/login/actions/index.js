import { LOGIN, LOGIN_RESULTS } from './action_types';

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

