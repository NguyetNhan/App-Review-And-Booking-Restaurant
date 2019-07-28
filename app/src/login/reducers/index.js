import { LOGIN_RESULTS } from '../actions/action_types';


const LoginReducers = (state = [], action) => {
        switch (action.type) {
                case LOGIN_RESULTS:
                        return {
                                Login: {
                                        data: action.data
                                }
                        };

                default:
                        return state;
        }
};

export default LoginReducers;