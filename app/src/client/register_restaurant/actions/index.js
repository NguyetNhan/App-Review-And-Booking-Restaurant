import {
        REGISTER_RESTAURANT,
        REGISTER_RESTAURANT_FAILED,
        REGISTER_RESTAURANT_SUCCEEDED,
        RESET_PROPS_REGISTER
} from './action_types';


export const onRegisterRestaurant = (data) => {
        return {
                type: REGISTER_RESTAURANT,
                data
        };
};


export const onRegisterRestaurantFailed = (message) => {
        return {
                type: REGISTER_RESTAURANT_FAILED,
                message
        };
};

export const onRegisterRestaurantSucceeded = (message) => {
        return {
                type: REGISTER_RESTAURANT_SUCCEEDED,
                message
        };
};

export const onResetProps = () => {
        return {
                type: RESET_PROPS_REGISTER
        };
};