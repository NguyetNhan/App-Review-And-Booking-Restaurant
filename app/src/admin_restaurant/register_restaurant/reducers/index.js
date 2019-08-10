import { REGISTER_RESTAURANT_RESULT } from '../actions/action_types';


const RegisterRestaurantReducers = (state = [], action) => {
        switch (action.type) {
                case REGISTER_RESTAURANT_RESULT:
                        return {
                                RegisterRestaurant: {
                                        data: action.data
                                }
                        };

                default:
                        return state;
        }
};

export default RegisterRestaurantReducers;