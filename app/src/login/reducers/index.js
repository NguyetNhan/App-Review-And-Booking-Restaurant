import { LOGIN_RESULTS, ADD_ACCOUNT_INTO_LOCAL_RESULTS } from '../actions/action_types';


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
                default:
                        return state;
        }
};

export default LoginReducers;