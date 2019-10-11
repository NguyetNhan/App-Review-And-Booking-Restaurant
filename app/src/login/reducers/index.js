import {
        LOGIN_FAILED,
        LOGIN_SUCCEEDED,
        ADD_ACCOUNT_INTO_LOCAL_FAILED,
        ADD_ACCOUNT_INTO_LOCAL_SUCCEEDED,
        RESET_PROPS_LOGIN,
        RESET_PROPS_MESSAGE_LOGIN
} from '../actions/action_types';


const LoginReducers = (state = null, action) => {
        switch (action.type) {
                case LOGIN_SUCCEEDED:
                        return {
                                loginSucceeded: {
                                        data: action.data,
                                }
                        };
                case LOGIN_FAILED:
                        return {
                                loginFailed: {
                                        message: action.message
                                }
                        };
                case ADD_ACCOUNT_INTO_LOCAL_SUCCEEDED:
                        return {
                                addAccountLocalSucceeded: {
                                        message: action.message,
                                }
                        };
                case ADD_ACCOUNT_INTO_LOCAL_FAILED:
                        return {
                                addAccountLocalFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_LOGIN:
                        return {
                                resetProps: {
                                        messagesAddAccountSucceeded: undefined,
                                        messagesAddAccountFailed: undefined,
                                        messagesLogin: undefined,
                                        account: undefined,
                                        isLoading: false,
                                }
                        };
                case RESET_PROPS_MESSAGE_LOGIN:
                        return {
                                resetPropsMessage: {
                                        messagesAddAccountSucceeded: undefined,
                                        messagesAddAccountFailed: undefined,
                                        messagesLogin: undefined,
                                }
                        };
                default:
                        return state;
        }
};

export default LoginReducers;