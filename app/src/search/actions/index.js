import { SEARCH_RESTAURANT, SEARCH_RESTAURANT_FAILED, SEARCH_RESTAURANT_SUCCEEDED } from './action_types';


export const onSearchRestaurant = (data) => {
        return {
                type: SEARCH_RESTAURANT,
                data
        };
};

export const onSearchRestaurantSucceeded = (data) => {
        return {
                type: SEARCH_RESTAURANT_SUCCEEDED,
                data
        };
};

export const onSearchRestaurantFailed = (data) => {
        return {
                type: SEARCH_RESTAURANT_FAILED,
                data
        };
};