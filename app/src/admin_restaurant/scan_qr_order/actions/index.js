import {
        CONFIRM_ORDER_FOR_ADMIN_RESTAURANT,
        CONFIRM_ORDER_FOR_ADMIN_RESTAURANT_FAILED,
        CONFIRM_ORDER_FOR_ADMIN_RESTAURANT_SUCCEEDED,
        RESET_PROPS_SCAN_QR
} from './types';

export const onConfirmOrderForAdminRestaurant = (data) => {
        return {
                type: CONFIRM_ORDER_FOR_ADMIN_RESTAURANT,
                data
        };
};

export const onConfirmOrderForAdminRestaurantSucceeded = (data) => {
        return {
                type: CONFIRM_ORDER_FOR_ADMIN_RESTAURANT_SUCCEEDED,
                data
        };
};

export const onConfirmOrderForAdminRestaurantFailed = (messages) => {
        return {
                type: CONFIRM_ORDER_FOR_ADMIN_RESTAURANT_FAILED,
                messages
        };
};

export const onResetPropsScanQr = () => {
        return {
                type: RESET_PROPS_SCAN_QR,
        };
};