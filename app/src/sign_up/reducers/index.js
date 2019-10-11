import {
        SIGNUP_FAILED,
        SIGNUP_SUCCEEDED,
        RESET_PROPS_MESSAGE_SIGNUP,
        RESET_PROPS_SIGNUP
} from '../actions/action_types';


const SignupReducers = (state = null, action) => {
        switch (action.type) {
                case SIGNUP_SUCCEEDED:
                        return {
                                signUpSucceeded: {
                                        message: action.message
                                }
                        };
                case SIGNUP_FAILED:
                        return {
                                signUpFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_SIGNUP:
                        return {
                                resetProps: {
                                        message: undefined,
                                        isLoading: false
                                }
                        };
                case RESET_PROPS_MESSAGE_SIGNUP:
                        return {
                                resetPropsMessage: {
                                        message: undefined
                                }
                        };
                default:
                        return state;
        }
};

export default SignupReducers;