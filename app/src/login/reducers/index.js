import {
        LOGIN_RESULTS,
        ADD_ACCOUNT_INTO_LOCAL_RESULTS,
        RESET_PROPS
} from '../actions/action_types';


const LoginReducers = (state = [], action) => {
        switch (action.type) {
                case LOGIN_RESULTS:
                        return {
                                Login: {
                                        data: action.data
                                }
                        };
                case ADD_ACCOUNT_INTO_LOCAL_RESULTS:
                        return {
                                AddAccount: {
                                        data: action.data
                                }
                        };
                case RESET_PROPS:
                        return {
                                ResetProps: {
                                        loading: false,
                                        account: null,
                                }
                        };
                default:
                        return state;
        }
};

export default LoginReducers;