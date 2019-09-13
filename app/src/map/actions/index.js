import {
        FETCH_NEARBY_LOCATION_RESTAURANT,
        FETCH_NEARBY_LOCATION_RESTAURANT_FAILED,
        FETCH_NEARBY_LOCATION_RESTAURANT_SUCCEEDED
} from './action_types';

export const onFetchNearbyLocationRestaurant = (position) => {
        return {
                type: FETCH_NEARBY_LOCATION_RESTAURANT,
                position
        };
};

export const onFetchNearbyLocationRestaurantSucceeded = (data) => {
        return {
                type: FETCH_NEARBY_LOCATION_RESTAURANT_SUCCEEDED,
                data
        };
};

export const onFetchNearbyLocationRestaurantFailed = (messages) => {
        return {
                type: FETCH_NEARBY_LOCATION_RESTAURANT_FAILED,
                messages
        };
};