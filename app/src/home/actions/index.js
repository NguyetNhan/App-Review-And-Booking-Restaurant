import {
        FETCH_LIST_RESTAURANT,
        FETCH_LIST_RESTAURANT_SUCCEEDED,
        FETCH_LIST_RESTAURANT_FAILED,
        FETCH_LIST_BAR, FETCH_LIST_BAR_FAILED,
        FETCH_LIST_BAR_SUCCEEDED,
        FETCH_LIST_COFFEE,
        FETCH_LIST_COFFEE_FAILED, FETCH_LIST_COFFEE_SUCCEEDED,
        FETCH_NEARBY_LOCATION_RESTAURANT_FAILED,
        FETCH_NEARBY_LOCATION_RESTAURANT_FOR_HOME,
        FETCH_NEARBY_LOCATION_RESTAURANT_SUCCEEDED
} from './action_types';

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


export const onFetchListCoffee = (data) => {
        return {
                type: FETCH_LIST_COFFEE,
                data
        };
};


export const onFetchListCoffeeSucceeded = (data) => {
        return {
                type: FETCH_LIST_COFFEE_SUCCEEDED,
                data
        };
};

export const onFetchListCoffeeFailed = (messages) => {
        return {
                type: FETCH_LIST_COFFEE_FAILED,
                messages
        };
};

export const onFetchListBar = (data) => {
        return {
                type: FETCH_LIST_BAR,
                data
        };
};


export const onFetchListBarSucceeded = (data) => {
        return {
                type: FETCH_LIST_BAR_SUCCEEDED,
                data
        };
};

export const onFetchListBarFailed = (messages) => {
        return {
                type: FETCH_LIST_BAR_FAILED,
                messages
        };
};

export const onFetchNearbyLocationRestaurant = (position) => {
        return {
                type: FETCH_NEARBY_LOCATION_RESTAURANT_FOR_HOME,
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