import { FETCH_LIST_RESTAURANT, FETCH_LIST_RESTAURANT_SUCCEEDED, FETCH_LIST_RESTAURANT_FAILED } from './action_types';

export const onFetchListRestaurant = (data) => {
        return {
                type: FETCH_LIST_RESTAURANT,
                data
        };
};

export const onFetchListRestaurantSucceeded = (data) => {
        return {
                type: FETCH_LIST_RESTAURANT_SUCCEEDED,
                data
        };
};

export const onFetchListRestaurantFailed = (messages) => {
        return {
                type: FETCH_LIST_RESTAURANT_FAILED,
                messages
        };
};