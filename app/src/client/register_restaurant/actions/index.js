import { REGISTER_RESTAURANT, REGISTER_RESTAURANT_RESULT } from './action_types';


export const onRegisterRestaurant = (data) => {
        return {
                type: REGISTER_RESTAURANT,
                data
        };
};


export const onRegisterRestaurantResults = (data) => {
        return {
                type: REGISTER_RESTAURANT_RESULT,
                data
        };
};