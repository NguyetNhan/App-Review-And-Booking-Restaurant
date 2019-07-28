import { SIGNUP_RESULTS } from '../actions/action_types';


const SignupReducers = (state = [], action) => {
        switch (action.type) {
                case SIGNUP_RESULTS:
                        return {
                                Signup: {
                                        data: action.data
                                }
                        };
                default:
                        return state;
        }
};

export default SignupReducers;