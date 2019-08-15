import { FETCH_LIST_CONFIRM_RESTAURANT, FETCH_LIST_CONFIRM_RESTAURANT_RESULTS } from './action_types';

export const onFetchListConfirmRestaurant = () => {
        return {
                type: FETCH_LIST_CONFIRM_RESTAURANT,

        };
};

export const onFetchListConfirmRestaurantResults = (data) => {
        return {
                type: FETCH_LIST_CONFIRM_RESTAURANT_RESULTS,
                data
        };
};