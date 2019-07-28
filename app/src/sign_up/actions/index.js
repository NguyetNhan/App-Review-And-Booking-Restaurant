import { SIGNUP, SIGNUP_RESULTS } from './action_types';

export const onSignup = (data) => {
        return {
                type: SIGNUP,
                data
        };
};

export const onSignupResults = (data) => {
        return {
                type: SIGNUP_RESULTS,
                data
        };
};