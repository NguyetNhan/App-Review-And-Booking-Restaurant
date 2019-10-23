import {
        FETCH_NEARBY_LOCATION_RESTAURANT,
        FETCH_NEARBY_LOCATION_RESTAURANT_FAILED,
        FETCH_NEARBY_LOCATION_RESTAURANT_SUCCEEDED,
        FETCH_LOCATION_FRIEND,
        FETCH_LOCATION_FRIEND_FAILED,
        FETCH_LOCATION_FRIEND_SUCCEEDED,
        FETCH_LOCATION_STRANGER,
        FETCH_LOCATION_STRANGER_FAILED,
        FETCH_LOCATION_STRANGER_SUCCEEDED,
        RESET_PROPS_MAP,
        RESET_PROPS_MESSAGE_MAP
} from './action_types';

export const onResetProps = () => {
        return {
                type: RESET_PROPS_MAP
        };
};

export const onResetPropsMessage = () => {
        return {
                type: RESET_PROPS_MESSAGE_MAP
        };
};

export const onFetchLocationStranger = (geolocation) => {
        return {
                type: FETCH_LOCATION_STRANGER,
                geolocation
        };
};
export const onFetchLocationStrangerSucceeded = (data) => {
        return {
                type: FETCH_LOCATION_STRANGER_SUCCEEDED,
                data
        };
};
export const onFetchLocationStrangerFailed = (message) => {
        return {
                type: FETCH_LOCATION_STRANGER_FAILED,
                message
        };
};

export const onFetchLocationFriend = (idAccount) => {
        return {
                type: FETCH_LOCATION_FRIEND,
                idAccount
        };
};
export const onFetchLocationFriendSucceeded = (data) => {
        return {
                type: FETCH_LOCATION_FRIEND_SUCCEEDED,
                data
        };
};
export const onFetchLocationFriendFailed = (message) => {
        return {
                type: FETCH_LOCATION_FRIEND_FAILED,
                message
        };
};

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