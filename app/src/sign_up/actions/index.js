import { SIGNUP, SIGNUP_FAILED, SIGNUP_SUCCEEDED, RESET_PROPS_MESSAGE_SIGNUP, RESET_PROPS_SIGNUP } from './action_types';

export const onSignup = (data) => {
        return {
                type: SIGNUP,
                data
        };
};

export const onSignupSucceeded = (message) => {
        return {
                type: SIGNUP_SUCCEEDED,
                message
        };
};
export const onSignupFailed = (message) => {
        return {
                type: SIGNUP_FAILED,
                message
        };
};

export const onResetProps = () => {
        return {
                type: RESET_PROPS_SIGNUP,
        };
};
export const onResetPropsMessage = () => {
        return {
                type: RESET_PROPS_MESSAGE_SIGNUP,
        };
};

