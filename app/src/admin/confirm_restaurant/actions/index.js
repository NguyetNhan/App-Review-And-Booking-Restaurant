import { FETCH_LIST_CONFIRM_RESTAURANT, FETCH_LIST_CONFIRM_RESTAURANT_RESULTS, CONFIRM_AGREE, CONFIRM_AGREE_RESULTS, CONFIRM_CANCEL, CONFIRM_CANCEL_RESULTS } from './action_types';

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

export const onConfirmAgree = (data) => {
        return {
                type: CONFIRM_AGREE,
                data
        };
};

export const onResultsConfirmAgree = (data) => {
        return {
                type: CONFIRM_AGREE_RESULTS,
                data
        };
};

export const onConfirmCancel = (data) => {
        return {
                type: CONFIRM_CANCEL,
                data
        };
};

export const onResultsConfirmCancel = (data) => {
        return {
                type: CONFIRM_CANCEL_RESULTS,
                data
        };
};