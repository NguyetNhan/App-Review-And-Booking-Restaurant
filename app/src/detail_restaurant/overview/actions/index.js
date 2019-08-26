import {
        FETCH_DETAIL_RESTAURANT,
        FETCH_DETAIL_RESTAURANT_FAILED,
        FETCH_DETAIL_RESTAURANT_SUCCEEDED
} from './action_types';

export const onFetchDetailRestaurant = (data) => {
        return {
                type: FETCH_DETAIL_RESTAURANT,
                data
        }
}

export const onFetchDetailRestaurantSucceeded = (data) => {
        return {
                type: FETCH_DETAIL_RESTAURANT_SUCCEEDED,
                data
        }
}

export const onFetchDetailRestaurantFailed = (message) => {
        return {
                type: FETCH_DETAIL_RESTAURANT_FAILED,
                message
        }
}



