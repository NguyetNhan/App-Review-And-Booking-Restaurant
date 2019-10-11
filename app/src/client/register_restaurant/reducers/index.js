import { REGISTER_RESTAURANT_FAILED, REGISTER_RESTAURANT_SUCCEEDED, RESET_PROPS_REGISTER } from '../actions/action_types';


const RegisterRestaurantReducers = (state = null, action) => {
        switch (action.type) {
                case REGISTER_RESTAURANT_SUCCEEDED:
                        return {
                                registerSucceeded: {
                                        message: action.message
                                }
                        };
                case REGISTER_RESTAURANT_FAILED:
                        return {
                                registerFailed: {
                                        message: action.message
                                }
                        };
                case RESET_PROPS_REGISTER:
                        return {
                                resetProps: {
                                        message: undefined,
                                        isLoading: false
                                }
                        };
                default:
                        return state;
        }
};

export default RegisterRestaurantReducers;